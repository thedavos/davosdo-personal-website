# Project guidelines

## Architecture

- Prefer Astro components for static and server-rendered UI.
- Use Vue only when client-side state or interaction is required.
- Use the narrowest appropriate `client:*` hydration directive.
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

## Assets

- Prefer Astro image components for local images when optimization is useful.
- Provide explicit image dimensions to prevent layout shifts.
- Store project images under `src/assets/projects` and static passthrough assets under `public`.

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

## Change discipline

- Preserve the existing formatting style in files being edited.
- Avoid unrelated refactors.
- Do not add dependencies when the existing stack can reasonably solve the requirement.
- Do not modify generated files under `dist`.
