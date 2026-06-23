# davosdo.dev

Sitio personal y portfolio de [David Vargas Domínguez](https://davosdo.dev): landing con proyectos, servicios, blog, experiencia y formulario de contacto.

## Stack

- [Astro](https://astro.build) 6 + islands de [Vue](https://vuejs.org) donde hace falta interactividad
- [UnoCSS](https://unocss.dev) para estilos utilitarios y tokens del sitio
- [Cloudflare Workers](https://developers.cloudflare.com/workers/) para hosting, assets estáticos y el endpoint de contacto
- [Swup](https://swup.js.org) para transiciones entre páginas
- Content Collections para el blog en `src/content/blog`

## Requisitos

- Node.js 22 o superior
- [pnpm](https://pnpm.io)

## Desarrollo local

```bash
pnpm install
cp .env.example .env
pnpm dev
```

El sitio queda disponible en `http://localhost:4321`.

Variables relevantes para desarrollo:

| Variable | Uso |
| --- | --- |
| `CONTACT_FROM_EMAIL` | Remitente del formulario de contacto |
| `CONTACT_TO_EMAIL` | Bandeja de destino |
| `PUBLIC_TURNSTILE_SITE_KEY` | Site key pública de Cloudflare Turnstile |
| `PUBLIC_DISABLE_TURNSTILE` | Pon `true` en `.env.development` para desactivar Turnstile en local |

El secreto de Turnstile (`TURNSTILE_SECRET_KEY`) va como secret de Wrangler, no en el repositorio.

## Scripts

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción en `dist/` |
| `pnpm preview` | Build + preview con Wrangler |
| `pnpm check` | Build, comprobación de tipos y dry-run de deploy |
| `pnpm deploy` | Despliegue a Cloudflare Workers |

## Estructura del proyecto

```text
src/
├── components/     # UI (Astro y Vue)
├── content/blog/   # Artículos en Markdown/MDX
├── data/           # Proyectos, servicios, experiencia, FAQ
├── layouts/        # PageLayout, BlogPost
├── pages/          # Rutas del sitio
└── styles/         # CSS global, home, blog, formularios
public/             # Assets estáticos (logos, imágenes del blog, etc.)
```

Convenciones y guías para contribuir o trabajar con el código: [`AGENTS.md`](./AGENTS.md).

## Despliegue

El proyecto usa `@astrojs/cloudflare`. Tras configurar secrets y variables en Wrangler:

```bash
pnpm build
pnpm deploy
```

## Licencia

Proyecto privado. No redistribuir sin permiso.
