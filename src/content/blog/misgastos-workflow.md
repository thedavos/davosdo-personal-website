---
title: "Cómo terminé construyendo mi propio tracker de gastos con Telegram, n8n e IA"
description: "Cómo armé un workflow personal para registrar gastos desde Telegram con n8n, Supabase, AWS Bedrock y Metabase."
category: "Automatización"
pubDate: "Jul 7 2026"
heroImage: "/blog/misgastos-workflow/misgastos-flow-diagram.png"
---

## Por qué

Hace un tiempo venía perdiendo el control de mis gastos. Más o menos sabía cuánto gastaba cada mes, pero después de unos días me costaba recordar en qué se me había ido el dinero. A veces apuntaba gastos sueltos en las notas del celular o en un chat conmigo mismo en WhatsApp, pero nunca me duraba demasiado.

También probé algunas aplicaciones de finanzas personales, pero ninguna terminaba de encajar con lo que buscaba. Yo quería algo rápido, casi inmediato: registrar un gasto en segundos y seguir con mi día. En la mayoría de apps había demasiada fricción: abrir la aplicación, elegir una categoría, escribir una descripción, poner el monto, seleccionar el método de pago y recién guardar. Eran demasiados pasos para algo que quería resolver con un mensaje.

Además, buena parte de mis gastos pasan por Yape, Plin o tarjetas, y casi ninguna app que probé entendía bien esa realidad. Muchas terminaban tratando Yape o Plin como si fueran efectivo, cuando para mí era importante diferenciar el método de pago del comercio o de la persona a la que le estaba pagando.

Así que decidí construir algo propio. La idea era que el input fuera lo más simple posible —un mensaje de Telegram, una frase rápida o incluso una captura— y que por detrás se hiciera todo el trabajo pesado: extraer los datos, clasificar el gasto, identificar el método de pago y guardarlo en una base de datos.

No lo pensé como un producto para vender ni como una app pública. Era algo bastante personal, hecho para mi forma de registrar gastos y para recuperar algo que había perdido: visibilidad sobre en qué se me va el dinero.

## El primer intento y todo lo que salió mal

La primera versión la tomé más como un experimento que como un sistema definitivo. Quería entender mejor cómo funcionaba n8n, cómo se conectaban sus nodos y hasta dónde podía llegar armando un flujo simple. Empezó como un workflow bastante básico: un nodo de Telegram para recibir los mensajes, algunos nodos Code para procesar datos, un nodo LLM para interpretar el gasto, un modelo de datos de los gastos y Airtable como base de datos.

Nada de self-hosted, nada demasiado elaborado. Solo lo mínimo para probar si la idea tenía sentido.

Las primeras dificultades aparecieron con el prompt. La moneda casi siempre la asumía bien: soles. El problema estaba en la categoría y el merchant. Como la base era chica y no tenía una forma real de modelar una taxonomía ni reglas específicas para comercios, el modelo terminaba clasificando con muy poco contexto.

Un almuerzo podía salir como “Comida”, “Alimentación” o “Restaurante” según el día. Y un pago por Yape a veces quedaba registrado con el nombre de la app como si fuera el comercio, cuando en realidad Yape era solo el método de pago.

A eso se sumó otro problema: el Structured Output Parser de n8n. En teoría debía ayudarme a forzar una respuesta con estructura, pero en la práctica me generaba errores de parsing con cierta frecuencia. La respuesta del modelo no siempre calzaba exactamente con el schema que le pedía, y el flujo terminaba fallando por detalles que necesitaba controlar mejor.

Terminé sacando ese parser y lo reemplacé por un nodo Code. Ese nodo recibe el JSON tal como lo devuelve el modelo y lo valida campo por campo, con reglas explícitas para manejar valores faltantes, formatos incorrectos o categorías que no existen. Es menos elegante que dejar que n8n lo resuelva solo, pero para este caso terminó siendo mucho más predecible.

## Por qué Telegram y no una app propia

Nunca consideré en serio construir una interfaz propia. No es que tenga Telegram abierto todo el día: lo abro de vez en cuando, sobre todo cuando hago un gasto y quiero anotarlo antes de que se me olvide. Para eso alcanza de sobra; escribir un mensaje es más rápido que abrir una app y navegar hasta un formulario.

Construir una app me parecía demasiado para una necesidad bastante simple: anotar gastos y luego verlos en un dashboard. Con n8n recibiendo los mensajes, una base de datos guardándolos y Metabase visualizándolos, ya tenía todo lo necesario para cumplir el objetivo. Sumar una interfaz encima habría sido resolver un problema que, en realidad, no tenía.

## Rehaciendo todo: self-hosted en Railway

La versión inicial me sirvió para validar la idea, pero Airtable no me iba a dar lo que necesitaba para crecer: no hay SQL real ni forma de armar una vista que junte categorías con reglas de merchants. Hace unas semanas migré todo a un stack self-hosted en Railway: Supabase completo, corriendo ahí mismo, junto con n8n y Metabase, cada uno con su propio Postgres.

![Arquitectura self-hosted en Railway](/blog/misgastos-workflow/railway-self-hosted-stack.png)

Elegí self-hostear Supabase, no la versión gestionada, por una razón concreta: quería poder crear mis propias vistas SQL sobre los datos sin pelear con los límites del plan gratuito. Todo queda detrás de un túnel de Cloudflare, con subdominios propios, así que no hay ninguna URL genérica de Railway dando vueltas.

> *Uso Railway para este proyecto y para otros servicios personales. Si estás pensando en montar algo parecido, dejo mi [link de referido](https://links.davosdo.dev/railway): te da $20 en créditos de bienvenida y, si más adelante pagas por el servicio, yo recibo una comisión. Lo menciono por transparencia; el post no va de Railway, pero puede servirte si quieres probar un setup similar.*

Técnicamente, el sistema quedó separado en piezas bastante claras: Telegram es la interfaz, n8n orquesta el flujo, Supabase guarda el estado, Bedrock interpreta el gasto y Metabase muestra el resultado. No hay una app propia en el medio, que era justo lo que quería evitar.

## La extracción con IA

Para la extracción uso Amazon Nova Lite a través de AWS Bedrock (`amazon.nova-lite-v1:0`, temperatura `0.1`), en un nodo **Basic LLM Chain** dentro de n8n. La elección fue pragmática: tengo una cuenta de estudiante con créditos en AWS, así que preferí aprovecharlos antes de sumar otro costo fijo al proyecto. Para el volumen que genero yo solo, Nova Lite era suficiente; no necesitaba un modelo más grande para interpretar mensajes cortos, montos, métodos de pago y categorías. Además, puede procesar texto e imagen en el mismo flujo, algo útil porque no siempre escribo el gasto: a veces simplemente mando una captura de un voucher y dejo que el modelo extraiga los datos.

El flujo actual se ve así:

![Diagrama del workflow de MisGastos](/blog/misgastos-workflow/misgastos-flow-diagram.png)

La parte más importante del diagrama es que el workflow no trata todos los mensajes igual. Si llega texto, va por la rama de texto. Si llega una imagen, n8n descarga el archivo de Telegram como binario (`telegram_image`) y lo pasa al LLM como un mensaje humano de tipo `imageBinary`. Esto parece un detalle de implementación, pero cambia bastante el resultado: el modelo no recibe una URL escrita en el prompt, recibe la imagen real.

También hay un paso de contexto antes de llamar al modelo. Ahí se consulta si existe un draft abierto para ese chat, se trae la taxonomía desde Supabase y se arma un prompt con reglas específicas para Perú: Yape y Plin como método de pago, no como comercio; taxis y micros como transporte; servicios como OpenAI, Railway o Cloudflare como tecnología y trabajo.

Antes de llegar al prompt actual, el modelo no tenía ningún contexto real sobre mis categorías: solo las nombraba en el texto del prompt y esperaba que las recordara bien cada vez. La solución fue crear una vista en Postgres, `v_ai_taxonomy_context`, que junta categorías, subcategorías y reglas de merchants en un solo JSON. Ese JSON se le pasa al modelo en cada llamada, así que nunca tiene que inventar una categoría que no existe en mi taxonomía real. A grandes rasgos, algo así:

```sql
-- v_ai_taxonomy_context (ejemplo simplificado)
select jsonb_build_object(
  'categories', (select jsonb_agg(c) from categories c where c.active),
  'merchant_rules', (select jsonb_agg(m) from merchant_rules m where m.active)
);
```

Con ese contexto, un mensaje como "pagué 95 soles por Yape a Renzo, mi parte del Airbnb" sale más o menos así:

```json
{
  "amount": 95,
  "currency": "PEN",
  "category": "Transferencias personales",
  "subcategory": "Gastos compartidos",
  "merchant": "Renzo",
  "payment_method": "Yape",
  "confidence": 0.93,
  "missing_fields": []
}
```

Yape ahí es el método de pago, no el merchant. Al principio los mezclaba y me arruinaba las categorías: Yape terminaba apareciendo como si fuera una tienda.

![Workflow original en n8n](/blog/misgastos-workflow/n8n-workflow-overview.png)

## Los problemas que sí me costaron

Ya conté el del parser. Después aparecieron problemas menos visibles, pero más importantes para que el workflow fuera confiable.

El primero fue la visión. Yo asumía que si le pasaba al modelo una URL de Telegram dentro del prompt, el modelo iba a poder leer la imagen. En realidad eso era solo texto. Para que el Basic LLM Chain vea una captura o un voucher, la imagen tiene que llegar como contenido multimodal explícito. La corrección fue descargar el archivo y pasarlo como `imageBinary`.

El segundo fue el estado de los drafts. Cuando faltaba un dato, el workflow creaba una fila en `expense_drafts` con `status = awaiting_clarification`, pero no cerraba ese draft cuando el usuario respondía. Eso dejaba drafts viejos abiertos y podía contaminar el siguiente mensaje. La solución fue leer el draft abierto más reciente, usarlo como contexto y marcarlo como `resolved` cuando se crea un gasto confirmado o un draft nuevo que lo reemplaza.

El tercero fue más de seguridad: el token del bot de Telegram estaba metido en URLs dentro del JSON del workflow. Eso no debería vivir en un export versionable. Ahora el workflow usa `TELEGRAM_ACCESS_TOKEN` como variable de entorno, que ya está configurada en Railway.

También ajusté la fecha de referencia a `America/Lima`. Si usaba UTC, un mensaje enviado de noche en Perú podía caer en el día siguiente para el modelo, y eso afecta frases como "hoy" o "ayer".

Y todavía queda un pendiente que prefiero resolver en la base de datos: duplicados. El workflow guarda `source_message_id`, pero la protección fuerte debería ser un índice o constraint en Supabase para evitar que un retry de Telegram cree dos gastos iguales.

El otro problema que más tiempo me quitó fue Metabase.

Los filtros de fecha no funcionan bien como variables de texto sueltas, tienen que ser Field Filters conectados de verdad a una columna, o el dashboard mensual simplemente no filtra nada. A eso se sumaron varias queries que tuve que reescribir porque una cosa es que la query devuelva los datos correctos y otra que Metabase los grafique como uno espera, más bastante prueba y error ajustando el tipo de visualización de cada card hasta que el dashboard se viera como quería. De los problemas técnicos de este proyecto, este fue el que más tiempo terminé metiéndole.

![Dashboard de gastos en Metabase](/blog/misgastos-workflow/metabase-dashboard.png)

## No fue un fin de semana

Esto no es un proyecto complicado. En el fondo, es un wrapper de un LLM con un bot de Telegram al frente: el tipo de cosa que alguien arma en un fin de semana, y de hecho la primera versión nació más o menos así. Pero la versión que uso hoy me tomó cuatro días de trabajo repartidos en dos meses: dos días para la primera versión y dos más, varias semanas después, para pulirla y migrarla.

No lo apuré a propósito. Tengo trabajo de tiempo completo y otros proyectos, y elegí avanzar una hora cuando hay ganas antes que meterme un sprint nocturno para "terminarlo ya". El sistema sigue ahí, corriendo, con más de 650 gastos procesados y una confianza promedio de la IA que ronda 93%. No sé si habría llegado a esta versión más sólida si lo hubiera forzado en un fin de semana.

## El workflow en JSON

También voy a dejar el archivo del workflow en JSON para quien quiera revisarlo, importarlo en su propio n8n o simplemente usarlo como referencia:

[Descargar workflow de MisGastos](/blog/misgastos-workflow/misgastos-workflow.json)

No es un template universal ni pretende funcionar tal cual en cualquier cuenta. Está armado para mi setup: Telegram como entrada, Supabase como base de datos, AWS Bedrock como modelo y algunas reglas bastante peruanas para Yape, Plin, mercados, taxis, comida y servicios.

Antes de importarlo, hay que configurar las credenciales y variables de entorno propias. En mi caso, el token de Telegram no vive dentro del JSON: se carga como `TELEGRAM_ACCESS_TOKEN` en el servidor donde corre n8n. También hay que adaptar las credenciales de Supabase, Bedrock y los nombres de tablas/vistas si tu modelo de datos es distinto.

Lo comparto más como una fotografía del sistema real que uso que como una receta cerrada. Si te sirve, probablemente lo mejor sea copiar la estructura general y ajustar las reglas a tu forma de registrar gastos.

## Qué sigue

No tengo un roadmap. Se me ocurre agregar algo de análisis automático, comparar categorías mes a mes, un aviso cuando algo se dispara, pero no es urgente. La verdad es que reviso el dashboard de Metabase bastante seguido durante el mes, no solo al cierre. Me gusta poder ver las estadísticas en cualquier momento y, con el tiempo, sacar alguna conclusión más sobre mis propios gastos. Me da una sensación de control sobre en qué se me va el dinero, que es justo lo que no tenía antes de esto.

Si armaste algo parecido, o ves algo que harías distinto, me interesa escucharlo.
