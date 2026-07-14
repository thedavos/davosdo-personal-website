---
title: "Construyendo atajo con Codex: contexto, skills, subagentes e iteración"
description: "Lo que aprendí usando Codex, instrucciones persistentes, skills especializados y subagentes para convertir un proyecto personal en un producto pulido sobre Cloudflare."
category: "Inteligencia artificial"
pubDate: "Jul 14 2026"
heroImage: "/blog/construyendo-atajo-con-codex/atajo-landing.jpeg"
---

**atajo** comenzó como una excusa para aprender.

Quería construir un acortador de URLs personal, pero el objetivo real era explorar una pregunta más amplia: ¿cómo cambia el desarrollo de software cuando un agente de IA participa durante todo el proceso y no solamente en la generación inicial de código?

También quería profundizar en el ecosistema de Cloudflare, mejorar mi forma de escribir prompts y entender cómo utilizar Codex con instrucciones persistentes, skills especializados y subagentes.

No intenté generar la aplicación completa con un único prompt. atajo creció mediante muchas conversaciones, implementaciones, revisiones, pruebas y correcciones. Algunas iteraciones añadieron funcionalidades; otras eliminaron complejidad o corrigieron decisiones que parecían adecuadas de forma aislada, pero no funcionaban dentro del producto.

Con el tiempo, Codex dejó de sentirse como una herramienta para completar código y comenzó a formar parte de un proceso:

```text
Contexto → propuesta → implementación → revisión → verificación → nueva iteración
```

Este artículo resume lo que aprendí durante ese recorrido y lo que hizo falta para llevar atajo desde una idea hasta una versión que finalmente se siente coherente y pulida.

## Un proyecto personal, no un SaaS

atajo es un acortador de URLs personal. Permite crear enlaces breves, organizarlos mediante campañas y etiquetas, consultar su actividad y analizar su rendimiento desde un dashboard.

Por ahora, funciona para un único usuario y no ofrece registro público. La instancia desplegada responde a mis necesidades personales y el repositorio está disponible para quien quiera estudiarlo o autoalojarlo.

Esta decisión fue importante porque mantuvo claro el objetivo del proyecto. No necesitaba diseñar planes, cobros, equipos, invitaciones ni un sistema multiusuario. Podía concentrarme en los aspectos que quería aprender:

- Cómo estructurar una aplicación completa sobre Cloudflare.
- Cómo diseñar redirects rápidos y confiables.
- Cómo combinar persistencia, caché y telemetría.
- Cómo trabajar con Codex más allá de prompts aislados.
- Cómo iterar hasta alcanzar una experiencia visual coherente.
- Cómo verificar que las distintas capas del producto coincidieran entre sí.

Aunque un acortador de URLs parece sencillo, reúne suficientes problemas reales para convertirse en un buen laboratorio técnico.

## La arquitectura de atajo

La aplicación está construida con TanStack Start, React y TypeScript, y se ejecuta sobre Cloudflare Workers.

Cada servicio cumple una responsabilidad concreta:

- **Cloudflare D1** conserva los enlaces, campañas, etiquetas, preferencias y datos de autenticación.
- **Cloudflare KV** funciona como caché para resolver redirects sin consultar D1 en cada solicitud.
- **Workers Analytics Engine** recibe la telemetría de los clics.
- **Better Auth** maneja la autenticación mediante correo y contraseña.
- **TanStack Start** organiza las rutas, funciones de servidor y componentes de React.
- **Tailwind CSS** sostiene el sistema visual y los estados de interacción.

El flujo de un redirect público, por ejemplo, necesitaba algo más que consultar una URL y responder con un código 301 o 302.

La aplicación debe interpretar el host y la ruta, rechazar paths internos o reservados, normalizar el identificador, consultar la caché, recurrir a D1 cuando sea necesario, respetar estados inactivos o expirados, actualizar KV y registrar telemetría sin retrasar la respuesta.

Ese flujo terminó convertido en una regla persistente del proyecto:

```text
Solicitud
  → validar host y ruta
  → rechazar paths reservados
  → normalizar el short path
  → buscar en KV
  → consultar D1 en caso de miss
  → actualizar la caché
  → registrar el clic en segundo plano
  → responder con el redirect configurado
```

Definir este comportamiento antes de seguir implementando evitó que diferentes conversaciones produjeran versiones incompatibles de la misma lógica.

Dashboard de atajo con métricas del periodo, gráfica de clics y navegación lateral

## Codex como proceso, no como generador

Al comenzar, era fácil plantear solicitudes como “crea el dashboard” o “añade analytics”. Ese tipo de prompt puede producir una primera versión rápidamente, pero deja demasiadas decisiones implícitas.

¿Qué significa exactamente “analytics”? ¿Qué clics cuentan? ¿Cómo se compara un periodo con el anterior? ¿Qué zona horaria se utiliza? ¿Qué ocurre cuando una fuente todavía está cargando? ¿Cómo se mantiene la coherencia entre el resumen y el detalle de un enlace?

Las iteraciones más útiles comenzaron cuando dejé de pedir únicamente resultados y empecé a proporcionar contexto, restricciones y criterios de verificación.

Un ciclo típico se parecía a este:

1. Explicar el problema y el resultado esperado.
2. Pedir a Codex que inspeccionara el estado real del proyecto.
3. Contrastar la propuesta antes de modificar archivos.
4. Implementar un cambio acotado.
5. Ejecutar pruebas y TypeScript.
6. Revisar visualmente el resultado cuando correspondía.
7. Registrar las decisiones que debían mantenerse.
8. Repetir el ciclo sobre los problemas encontrados.

Codex participó en arquitectura, implementación, depuración, pruebas, documentación y diseño. Sin embargo, su aporte más importante no fue la cantidad de código escrito, sino la velocidad con la que podía recorrer ese ciclo de análisis y revisión.

## El valor de las instrucciones persistentes

Uno de los mayores cambios en la calidad del trabajo llegó al crear instrucciones persistentes para el repositorio.

En lugar de explicar las mismas decisiones en cada conversación, las convertí en reglas dentro de `AGENTS.md`. Allí quedaron definidos el stack, los límites entre servidor y cliente, el flujo de redirects, las rutas reservadas, las reglas visuales y las verificaciones obligatorias.

Algunas decisiones registradas fueron:

- Mantener los bindings de Cloudflare exclusivamente en el servidor.
- Acceder a D1, KV y Analytics Engine mediante rutas protegidas.
- Conservar los secretos y sesiones de Better Auth fuera del cliente.
- Rechazar rutas como `/dashboard`, `/api` y `/assets` como enlaces personalizados.
- Mantener la aplicación en modo claro.
- Utilizar una jerarquía visual compacta y accesible.
- Ejecutar la generación de rutas cuando cambiara el routing.
- Mantener limpio `pnpm build` con TypeScript estricto.

Esto convirtió al repositorio en parte del prompt.

La diferencia fue considerable. Una conversación nueva ya no necesitaba reconstruir mentalmente todo el proyecto. Codex podía comenzar con las mismas restricciones que habían guiado las iteraciones anteriores.

Aprendí que un contexto pequeño, explícito y actualizado resulta más útil que un prompt enorme escrito una sola vez. Las instrucciones persistentes también ayudan a evitar regresiones conceptuales: decisiones descartadas no vuelven a aparecer simplemente porque comenzó una sesión nueva.

## Los skills que utilicé y cómo influyeron en atajo

Otra ventaja de trabajar con Codex fue poder utilizar skills especializados: conjuntos de instrucciones diseñados para abordar un tipo concreto de problema.

No todos escribían código. Algunos ayudaban a evaluar una interfaz, otros aportaban criterios de accesibilidad o visualización de datos y otros definían cómo verificar y entregar un cambio.

### `impeccable`

Utilicé `impeccable` como punto de partida para varias revisiones de interfaz. Su función no era proponer un rediseño completamente nuevo, sino analizar la implementación existente, detectar detalles que hacían que la experiencia se sintiera poco refinada y convertir esas observaciones en cambios concretos.

Fue especialmente útil durante el pulido del dashboard: simplificación de encabezados, acciones secundarias, tooltips, controles segmentados y eliminación de elementos visuales que competían entre sí.

### `establish-visual-hierarchy`

Este skill ayudó a responder una pregunta fundamental: ¿qué debería entender primero una persona al entrar al dashboard?

Antes de la revisión, el estado actual de los enlaces, los filtros, los KPIs, las gráficas y los rankings tenían un peso visual demasiado parecido. El análisis llevó a establecer un orden más claro:

1. Estado general.
2. Periodo seleccionado.
3. KPIs dependientes del periodo.
4. Evolución de los clics.
5. Rankings y desgloses.

El resultado no dependió de hacer todo más grande. La mejora surgió de cambiar el orden, el peso tipográfico, la proximidad y el espacio disponible.

### `group-related-elements`

Lo utilicé para revisar qué controles y datos debían percibirse como parte del mismo bloque.

Un ejemplo importante fueron los filtros temporales. No podían parecer una acción aislada del encabezado porque afectaban a KPIs, gráficas y rankings. Debían estar visualmente asociados a la información que controlaban.

El mismo principio se aplicó a títulos, descripciones, tooltips y acciones de cada sección. Esta revisión ayudó a reducir una sensación común en dashboards: muchos componentes correctos individualmente, pero sin relaciones suficientemente claras entre ellos.

### `apply-consistent-spacing`

Este skill permitió dejar de ajustar márgenes de manera aislada y comenzar a trabajar con una escala de separación consistente.

La regla adoptada fue sencilla: utilizar más espacio entre secciones diferentes que entre elementos pertenecientes a una misma sección.

En atajo trabajé principalmente con una escala de 4, 8, 12, 16, 24, 32 y 48 píxeles. La escala no debía aplicarse de forma mecánica, pero servía como restricción para evitar valores arbitrarios y mantener un ritmo reconocible en desktop y móvil.

### `eliminate-visual-clutter`

Este fue uno de los skills más útiles durante las últimas iteraciones. Ayudó a identificar elementos que existían sin aportar información nueva:

- Bordes interiores dentro de cards que ya tenían un límite visible.
- Textos descriptivos redundantes.
- Decoraciones adicionales en controles con un estado activo suficientemente claro.
- Slugs que repetían visualmente el nombre de una etiqueta.
- Resúmenes temporales demasiado extensos.
- Botones secundarios con más presencia de la necesaria.

Un ejemplo concreto fue el control “Tendencia / Por día”. Conservé el patrón dotted, el icono y el texto, pero eliminé una barra inferior que repetía el mismo estado y generaba superposición visual.

El refinamiento no siempre consistió en añadir algo. Muchas veces significó saber qué retirar.

### `data-analytics:visualize-data`

Este skill ayudó a revisar el dashboard como una herramienta de análisis, no solamente como una composición visual.

Lo utilicé para evaluar qué métricas debían aparecer como KPIs, qué información pertenecía al periodo seleccionado, cómo distinguir los datos actuales de comparaciones anteriores y qué gráfica representaba mejor una serie temporal.

La revisión fue especialmente importante porque el dashboard mezclaba estado actual, actividad histórica y comparación de periodos. Sin una separación explícita, una interfaz visualmente correcta podía seguir contando una historia confusa.

### `build-color-palette` y `manage-color-contrast`

Durante la construcción de la identidad utilicé `build-color-palette` para abandonar combinaciones tomadas de forma aislada y crear escalas completas.

El resultado final quedó reducido a dos familias de marca: azul Atajo para acciones principales, navegación, información y estados activos; y coral Ruta para comparación, campañas, advertencias y acciones destructivas.

`manage-color-contrast` complementó ese trabajo con comprobaciones de contraste en bordes, texto, focus rings, estados activos, acciones destructivas y series de las gráficas.

Los estados importantes conservaron además etiquetas, iconos o patrones. El significado no debía depender únicamente del color.

### `agent-browser-verify`

Después de modificar varios componentes, utilicé `agent-browser-verify` para comprobar el resultado dentro de la aplicación real.

Las verificaciones incluyeron el layout en desktop y móvil, ausencia de overflow horizontal, alineación de títulos y filtros, tooltips mediante mouse y teclado, visibilidad de estados activos y errores en la consola.

En una de estas revisiones, las pruebas indicaban que un tooltip existía, pero la comprobación en navegador mostró que no llegaba a ser visible durante la interacción real. La implementación tuvo que corregirse antes de considerar terminada la tarea.

Ese caso reforzó una de las principales lecciones del proyecto: una prueba puede confirmar que un elemento está en el DOM, pero no necesariamente que una persona pueda utilizarlo.

### `autocommit`

Utilicé `autocommit` para convertir los cambios terminados en commits pequeños y semánticos.

Antes de cada commit se revisaba el estado del repositorio, el diff completo y los archivos staged. Los cambios se agrupaban por propósito y se evitaba incluir modificaciones ajenas o artefactos temporales.

Aunque no cambia directamente la experiencia del usuario, esta disciplina hizo más sencillo revisar la evolución de atajo y entender por qué se tomó cada decisión.

## Los skills no reemplazaron la dirección

Los skills aportaron criterios especializados, pero no decidieron por sí solos qué producto debía construir.

Yo seguía definiendo el objetivo, seleccionando qué recomendaciones tenían sentido y descartando las que no encajaban con atajo. Su mayor valor fue ayudarme a formular mejores preguntas y evaluar el resultado con criterios más específicos.

También aprendí que utilizar muchos skills al mismo tiempo no garantiza una mejor solución. Funcionaron mejor cuando cada uno tenía una responsabilidad clara y se aplicaba en un orden intencional.

Por ejemplo, en la revisión del dashboard utilicé esta secuencia:

```text
impeccable
→ establish-visual-hierarchy
→ group-related-elements
→ apply-consistent-spacing
→ eliminate-visual-clutter
→ data-analytics:visualize-data
→ agent-browser-verify
```

Primero se diagnosticaba la interfaz. Después se definía qué debía destacar, cómo debían agruparse los elementos y qué ritmo espacial utilizar. Luego se eliminaba el ruido, se validaba la lectura de los datos y finalmente se comprobaba el resultado en el navegador.

Esta secuencia convirtió una solicitud amplia como “mejora el dashboard” en un proceso más estructurado y verificable.

## El papel de los subagentes

Los subagentes fueron útiles cuando una tarea podía dividirse en preguntas independientes.

Una de las revisiones más amplias del dashboard se separó en cuatro líneas de trabajo:

- UX y estructura general del overview.
- Resiliencia y accesibilidad de los filtros de fecha.
- Contrato de analytics y rankings.
- Verificación de regresiones.

El objetivo no era producir más código en paralelo. Era obtener perspectivas independientes y reducir puntos ciegos.

Una implementación puede ser correcta desde la arquitectura y problemática desde la experiencia de usuario. Una métrica puede calcularse correctamente en un endpoint, pero no coincidir con la definición utilizada en otra pantalla. Una interacción puede verse bien con mouse y resultar confusa con teclado.

Las revisiones separadas ayudaron a encontrar ese tipo de desacuerdos.

También descubrí que delegar no siempre es conveniente. Los subagentes funcionaron mejor cuando recibieron un objetivo pequeño, un alcance explícito, archivos relevantes y criterios claros de éxito.

Cuando el problema depende de demasiadas decisiones compartidas, dividirlo puede fragmentar el contexto y generar más trabajo de coordinación que progreso real.

## De una aplicación funcional a una versión pulida

La primera versión funcional de atajo ya permitía crear enlaces y redirigir tráfico. Sin embargo, estaba lejos de sentirse terminada.

La etapa más larga fue el pulido.

El dashboard necesitó varias iteraciones para que las métricas fueran coherentes entre el resumen general y el detalle de cada enlace. Los rangos de fecha debían tener estados claros, comparaciones consistentes y zonas horarias explícitas. Los clics humanos debían separarse del tráfico automatizado sin producir cifras contradictorias.

En la interfaz trabajé sobre:

- Jerarquía entre métricas principales y secundarias.
- Estados de carga.
- Controles de fechas.
- Tablas fáciles de escanear.
- Acciones primarias y secundarias.
- Focus rings visibles.
- Contraste WCAG AA.
- Estados comunicados mediante texto y forma, no solamente color.
- Responsive design.
- Preferencias de movimiento reducido.

Muchas de estas mejoras fueron pequeñas cuando se observaban de forma aislada. Juntas cambiaron la percepción del producto.

Un ejemplo sencillo fue el CTA de inicio de sesión en la portada. Aunque estaba declarado como una acción secundaria, una configuración visual adicional hacía que se mostrara como un botón sólido. El código era válido y la navegación funcionaba, pero la jerarquía era incorrecta. La solución no fue añadir algo, sino retirar una capa visual que competía con la acción principal.

Esa clase de detalle resume buena parte del trabajo de pulido: alinear implementación, intención y percepción.

## Lo que no salió bien a la primera

Trabajar con Codex no eliminó los errores ni produjo siempre la mejor solución en el primer intento.

En algunas iteraciones, el código era técnicamente correcto, pero no respetaba la intención visual. En otras, diferentes módulos utilizaban definiciones ligeramente distintas para la misma métrica. También hubo momentos en los que una solicitud demasiado abierta permitió que se asumieran decisiones que yo todavía no había tomado.

Los problemas más comunes aparecieron cuando:

- El contexto era insuficiente.
- La tarea mezclaba demasiados objetivos.
- Los criterios de éxito no estaban definidos.
- Se verificaba únicamente el build.
- Una decisión importante permanecía solo en una conversación.
- Se delegaba una tarea demasiado conectada con el resto del sistema.

La solución normalmente no consistía en escribir un prompt más elaborado, sino en reducir el alcance, inspeccionar el estado real y hacer explícitas las restricciones.

También aprendí a desconfiar de los resultados excesivamente convincentes. Una respuesta bien redactada o una implementación extensa puede transmitir seguridad sin estar alineada con el producto. La verificación sigue siendo necesaria.

## Lo que aprendí

Después de muchas iteraciones, estas son las ideas que más valor tuvieron para mí.

### 1. El contexto persistente importa más que el prompt perfecto

Un prompt brillante puede resolver una tarea. Un buen conjunto de instrucciones puede mantener coherente un proyecto durante meses.

### 2. Las restricciones mejoran la autonomía

Definir qué tecnologías utilizar, dónde puede accederse a los datos y qué verificaciones son obligatorias permite que el agente avance con menos ambigüedad.

### 3. Las tareas pequeñas producen mejores revisiones

Cuando una solicitud tiene un objetivo claro, resulta más fácil implementar, verificar y evaluar el resultado.

### 4. Los subagentes sirven para obtener perspectivas

Su valor principal no está en multiplicar la cantidad de código, sino en examinar un problema desde ángulos independientes.

### 5. Compilar no equivale a verificar

Tests y TypeScript son indispensables, pero las interacciones y decisiones visuales también necesitan revisión en un navegador.

### 6. La documentación forma parte del producto

Registrar decisiones reduce repeticiones, facilita nuevas sesiones y mejora la capacidad de otras personas para entender el proyecto.

### 7. La IA acelera la iteración, no reemplaza la dirección

Codex puede investigar, proponer, implementar y verificar. Aun así, alguien debe decidir qué producto construir, qué compromisos aceptar y cuándo una solución realmente cumple el objetivo.

## El estado actual de atajo

Hoy, atajo incluye:

- Enlaces cortos personalizados.
- Redirects con caché.
- Autenticación.
- Campañas y etiquetas.
- Analytics generales y por enlace.
- Comparación entre periodos.
- Identificación de tráfico automatizado.
- Exportación de datos.
- Dashboard responsive.
- Pruebas de rutas, validación, analytics y componentes.

Sigue siendo un proyecto personal para un único usuario y no ofrece registro público. El objetivo tampoco ha cambiado: continuar aprendiendo sobre IA aplicada al desarrollo, prompting, agentes e infraestructura de Cloudflare.

El código está publicado con licencia MIT y puede utilizarse como referencia o punto de partida para una instalación propia.

Más que un producto “construido por IA”, considero que atajo fue construido mediante muchas conversaciones, decisiones, verificaciones e iteraciones junto a Codex.

Y esa diferencia importa.

**Divulgación sobre IA:** Codex fue utilizado ampliamente durante la arquitectura, implementación, depuración, revisión de interfaz, escritura de pruebas y documentación. Las decisiones de producto, la dirección técnica y la aprobación de los cambios permanecieron bajo mi responsabilidad.

---

**Producto:** [links.davosdo.dev](https://links.davosdo.dev)

**Código fuente:** [github.com/thedavos/davos-links](https://github.com/thedavos/davos-links)
