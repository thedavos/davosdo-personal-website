---
title: "Entendiendo SQL Injection"
description: "Qué es SQL injection, cómo detectarla, un ejemplo real de explotación y las medidas básicas para prevenirla."
category: "Ciberseguridad"
pubDate: "Jun 22 2026"
heroImage: "/blog/entendiendo-sql-injection/hero.svg"
---

SQL injection (SQLi) es una de las vulnerabilidades más conocidas y, a la vez, una de las que más sigue apareciendo en aplicaciones reales. En este artículo recopilo lo que he ido aprendiendo sobre el patrón: qué es, qué puede lograr un atacante, cómo empezar a detectarla y cómo se ve en la práctica.

## Qué es SQL injection

SQL injection es una vulnerabilidad que permite a un atacante interferir con las consultas que la aplicación ejecuta contra su base de datos. Si la entrada del usuario se concatena directamente en una sentencia SQL, el atacante puede alterar la lógica de esa consulta sin necesidad de acceder al código fuente.

En los casos más graves, un SQLi puede escalar hasta comprometer la infraestructura del backend o usarse como vector para un ataque de denegación de servicio (DoS).

## Qué puede conseguir un atacante

Tras una explotación exitosa, un atacante puede llegar a:

- Extraer contraseñas almacenadas en la base de datos.
- Obtener datos de tarjetas de crédito u otra información financiera.
- Acceder a información personal de los usuarios.
- Modificar o borrar registros.
- En escenarios avanzados, ejecutar comandos en el servidor o tumbar el servicio.

El impacto depende del motor de base de datos, los permisos de la cuenta que usa la aplicación y qué tan expuesta esté la consulta vulnerable.

## Cómo detectar una posible SQLi

Durante pruebas de seguridad (o al revisar código), estas son señales habituales:

1. **Probar con una comilla simple (`'`)**  
   Si la aplicación devuelve errores de SQL, respuestas inesperadas o cambia de comportamiento, puede haber concatenación insegura de entrada.

2. **Inyectar sintaxis SQL en el punto de entrada**  
   Observar si fragmentos como `' OR '1'='1` alteran el resultado de la consulta.

3. **Usar condiciones booleanas**  
   Comparar respuestas entre payloads como `OR 1=1` (siempre verdadero) y `OR 1=2` (siempre falso). Diferencias en el contenido, el código HTTP o el tiempo de respuesta sugieren que la entrada llega a la query.

Estas pruebas solo deben hacerse en entornos autorizados: aplicaciones propias, laboratorios o programas de bug bounty con permiso explícito.

## Dónde aparece en una consulta

La mayoría de los casos ocurren en la cláusula `WHERE` de un `SELECT`, pero SQL injection no se limita a ese contexto. También puede presentarse en:

- Sentencias `UPDATE`, tanto en los valores como en el `WHERE`.
- Sentencias `INSERT`.
- Sentencias `SELECT` que interpolan nombres de tabla o columna.
- Cláusulas `ORDER BY`.

Cualquier fragmento de una consulta construido con entrada del usuario sin sanitizar ni parametrizar es un candidato.

## Ejemplo: filtrar productos no publicados

Uno de los escenarios más didácticos es una tienda online que lista productos por categoría. Cuando el usuario elige una categoría, el navegador solicita una URL como:

```http
https://alguna-tienda.com/products?category=Electronic
```

En el servidor, eso puede traducirse en:

```sql
SELECT * FROM products
WHERE category = 'Electronic' AND released = 1
```

La consulta devuelve todos los productos de la tabla `products` cuya categoría es `Electronic` y cuyo campo `released` vale `1`.

El campo `released` suele usarse para ocultar productos que aún no deben mostrarse al público. Si `released = 0`, el producto existe en la base de datos pero no debería aparecer en el catálogo.

### Explotación sin defensas

Si la aplicación concatena el parámetro `category` sin validación ni consultas parametrizadas, un atacante puede enviar:

```http
https://alguna-tienda.com/products?category=Electronic'--
```

La consulta resultante quedaría así:

```sql
SELECT * FROM products
WHERE category = 'Electronic'--' AND released = 1
```

Lo relevante es el `--`: en SQL es el inicio de un comentario de línea. Todo lo que sigue queda ignorado por el motor, incluida la condición `AND released = 1`.

El resultado: se muestran **todos** los productos de la categoría `Electronic`, incluidos los que aún no estaban liberados.

## Cómo prevenir SQL injection

La mitigación efectiva no pasa por “escapar comillas” a mano, sino por diseñar la capa de datos correctamente:

- **Consultas parametrizadas (prepared statements)**  
  La entrada del usuario nunca forma parte de la estructura SQL; solo se envía como valor.

- **ORMs y query builders con bindings**  
  Útiles, pero solo si no se interpolan strings crudos en consultas dinámicas.

- **Principio de mínimo privilegio**  
  La cuenta de base de datos de la aplicación no debería poder leer tablas innecesarias ni ejecutar comandos administrativos.

- **Validación de entrada en el servidor**  
  Whitelists para categorías, IDs numéricos, enums, etc. La validación complementa la parametrización; no la reemplaza.

- **Evitar concatenar identificadores dinámicos**  
  Nombres de tabla o columna tomados del usuario requieren mecanismos específicos (whitelists), no parámetros estándar.

## Cierre

SQL injection sigue siendo peligrosa porque el fallo es simple de introducir y costoso de explotar: basta con que una sola consulta concatene entrada del usuario para abrir la puerta a filtraciones de datos o escaladas mayores.

Entender el mecanismo, cómo una comilla o un comentario `--` cambian la lógica de la query, ayuda tanto al atacante como al desarrollador. Del lado defensivo, la regla práctica es clara: **trata toda entrada externa como datos, nunca como parte del SQL.**
