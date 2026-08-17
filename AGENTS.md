# Project guidelines

## Architecture

- Prefer Astro components for static and server-rendered UI.
- Use Vue only when client-side state or interaction is required.
- Use the narrowest `client:*` hydration directive that still works. `client:load` on a `md:hidden` wrapper shipped ~83 KB of Vue to every desktop visitor for a menu they never saw; `client:media` matched the CSS that governed it.
- Reuse existing components before creating new abstractions.
- Use the configured import aliases such as `@components/*`, `@styles/*`, and `@data/*`.

## Styling

- Use UnoCSS utilities by default when creating or modifying components.
- Prefer UnoCSS for layout, spacing, sizing, responsive behavior, typography, colors, and simple interaction states.
- Reuse the tokens, shortcuts, presets, and rules defined in `uno.config.ts` before introducing new styling abstractions.
- Add a reusable UnoCSS shortcut when the same meaningful group of utilities appears in multiple places.
- Use dedicated CSS only when it materially improves clarity or is needed for complex animations, pseudo-elements, structural selectors, attribute-driven states, rich-content styling, or rules that would be difficult to read as utilities.
- Avoid duplicating the same property in both UnoCSS utilities and component CSS.
- Do not construct utility names dynamically, such as `` `text-${color}` ``, because UnoCSS may not detect them. Use complete static class names, an explicit mapping, or the `safelist` in `uno.config.ts`.
- When utility classes live in external `.js` or `.ts` files, ensure those files are included in UnoCSS content extraction or safelist the classes.
- Keep semantic class names when they are required by JavaScript behavior, tests, analytics, or complex CSS selectors; do not use them only as wrappers for utility-equivalent styling.

## TypeScript

- Keep TypeScript strict and avoid `any`.
- Define explicit types for component props, content data, and API responses.
- Validate nullable values instead of relying on non-null assertions.

## Content

- Keep blog content in `src/content/blog`.
- Update `src/content.config.ts` when frontmatter fields change.
- Use Astro content collection APIs instead of parsing content files manually.
- List RSS fields explicitly in `src/pages/rss.xml.js`. Spreading `post.data` publishes whatever the schema happens to hold, which turned an `image()` field into a serialized object in the feed.

## Navigation and Swup

- Preserve `#swup-container` and the existing transition classes.
- Account for Swup navigation when adding browser-side scripts.
- Ensure scripts remain functional after page transitions, not only after the initial page load.
- Preserve `data-*` attributes and semantic classes used as JavaScript hooks.

## Accessibility

- Use semantic HTML before adding ARIA attributes.
- Ensure interactive elements are keyboard accessible and have visible focus states.
- Give meaningful images descriptive `alt` text; use an empty `alt` for decorative images.
- Respect `prefers-reduced-motion`.
- Do not use clickable `div` or `span` elements in place of buttons or links.

## Images

Files under `public/` are served byte for byte: no resizing, no format conversion, no `srcset`. Everything rendered as an image therefore lives under `src/`.

- Store project images in `src/assets/projects/<slug>/` and blog images beside their post in `src/content/blog/<slug>/`.
- Reserve `public/` for files fetched by URL rather than rendered: `favicon.svg`, `og-image.png`, `logos/*`, `robots.txt`, downloadable attachments.
- Reference project images from `src/data/projects.ts` by their public-style path (`/projects/<slug>/<file>`). `src/lib/project-images.ts` resolves those to bundled modules with `import.meta.glob`, so new files need no import boilerplate.
- Reference blog images relatively (`./<slug>/<file>`) in frontmatter and in Markdown body, so the `image()` schema helper and the Markdown pipeline both resolve them.
- Derive `sizes` from the width the image actually occupies, measured in a browser, and end the `widths` ladder at twice that width for 2x screens. Guessed values silently over- or under-serve; earlier ones missed by up to 2.5x.
- Pass `width` and `height` at the displayed aspect ratio when CSS crops with `object-fit: cover`, so the crop happens server-side instead of shipping pixels the browser discards.
- Set `src` from JavaScript only via `getImage()` results computed at build time, as `ProjectImageLightbox.astro` does for its dialog.

## Cloudflare Images

The `/_image` endpoint applies a quality setting only when the generated URL carries a `q` parameter. Without one the Images binding encodes near-lossless: an 852x1064 WebP measured 641 KB unqualified against 76 KB at `q=80`, larger than its own source file.

- Keep `image.service` pointed at `src/lib/image-service.ts`, which injects the default quality. Astro exposes no global quality option and Markdown images cannot pass one per image, so this wrapper is the only place it can apply.
- That wrapper requires `imageService: "custom"` on the adapter, which stops the adapter from configuring images itself. `image.endpoint` and the `IMAGES` binding in `wrangler.json` are consequently declared by hand, and `/_image` returns 500 if either goes missing.
- Confirm transformed bytes against production when they matter. The local emulation in `wrangler dev` compresses roughly 1.15x better than Cloudflare Images and ignores `fit`, so server-cropped thumbnails look letterboxed locally and correct in production.

## Static assets and caching

- Declare cache headers in `public/_headers`. Workers Static Assets defaults everything to `max-age=0, must-revalidate`, so hashed `/_astro/*` output pays a revalidation round-trip until it is marked `immutable`.
- Treat filenames under `/_astro/*` as content-hashed and everything copied from `public/` as stable, and cache each accordingly.
- Custom headers reach static assets only. Responses generated by Worker code, `/_image` among them, set their own.

## Cloudflare

- Treat server code as Cloudflare Workers code and avoid unsupported Node.js APIs.
- Access secrets and bindings through the runtime environment.
- Never commit secrets or real environment values.
- Keep `.env.example` updated when adding required variables.

## Validation

- Use pnpm; the project requires Node.js 22 or newer.
- Run `pnpm build` after component, styling, content, or configuration changes.
- Run `pnpm check` for changes affecting TypeScript, Astro configuration, APIs, or Cloudflare.
- Verify responsive behavior and keyboard interaction for UI changes.
- Measure delivered bytes from a running build after changing image handling. Source file sizes describe nothing once `/_image` transforms at request time, and `srcset` means the chosen variant depends on viewport and DPR.

## Change discipline

- Preserve the existing formatting style in files being edited.
- Avoid unrelated refactors.
- Do not add dependencies when the existing stack can reasonably solve the requirement.
- Do not modify generated files under `dist`.
