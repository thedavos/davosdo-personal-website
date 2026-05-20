import { defineConfig, presetMini, presetIcons, transformerDirectives } from "unocss"


export default defineConfig({
	safelist: [
		"i-lucide-rocket",
		"i-lucide-github",
		"i-lucide-play",
		"i-lucide-sun",
		"i-lucide-moon",
		"i-lucide-arrow-right",
		"i-lucide-arrow-left",
	],
	presets: [
		presetMini(),
		presetIcons({
			collections: {
				lucide: () => import("@iconify-json/lucide/icons.json").then(i => i.default)
			}
		})
	],
	transformers: [
		transformerDirectives(),
	],
	rules: [
		["object-cover", { "object-fit": "cover" }],
	],
	theme: {
		colors: {
			primary: "rgb(var(--color-primary))",
			"primary-dark": "rgb(var(--color-primary-dark))",
			"primary-soft": "var(--color-primary-soft)",
			"primary-border": "var(--color-primary-border)",
			"primary-hover": "var(--color-primary-hover)",
			secondary: "rgb(var(--color-secondary))",
			tertiary: "rgb(var(--color-tertiary))",
			neutral: "rgb(var(--color-neutral))",
			background: "rgb(var(--color-background))",
			surface: "rgb(var(--color-surface))",
			panel: "rgb(var(--color-panel))",
			body: "rgb(var(--color-body))",
			muted: "rgb(var(--color-text-muted))",
			border: "rgb(var(--color-border))",
			outline: "rgb(var(--color-outline))",
			"card-border": "var(--color-card-border)",
		},
		fontFamily: {
			sans: "var(--font-geist-sans), sans-serif",
			mono: 'var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
		},
		fontSize: {
			xs: "var(--font-size-xs)",
			sm: "var(--font-size-sm)",
			base: "var(--font-size-base)",
			lg: "var(--font-size-lg)",
			xl: "var(--font-size-xl)",
			"2xl": "var(--font-size-2xl)",
			"3xl": "var(--font-size-3xl)",
		},
		borderRadius: {
			sm: "var(--radius-sm)",
			md: "var(--radius-md)",
			lg: "var(--radius-lg)",
			xl: "var(--radius-xl)",
			"2xl": "var(--radius-2xl)",
			full: "9999px",
		},
		boxShadow: {
			sm: "0 1px 2px var(--box-shadow-color), 0 1px 3px var(--box-shadow-color)",
			md: "0 2px 4px var(--box-shadow-color), 0 4px 12px var(--box-shadow-color)",
			lg: "0 4px 8px var(--box-shadow-color), 0 12px 32px var(--box-shadow-color)",
			xl: "0 8px 16px var(--box-shadow-color), 0 20px 48px var(--box-shadow-color)",
		},
	},
	shortcuts: {
		"page-container": "w-[720px] max-w-[calc(100%-2em)] mx-auto px-6 py-12",
		"page-container-wide": "w-[960px] max-w-[calc(100%-2em)] mx-auto px-6 py-12",
		"surface-card": "rounded-xl bg-surface shadow-md",
		"meta-text": "text-muted",
		"content-prose": "text-body leading-[1.7]",
		"section-title": "mb-2 text-body leading-tight",
		"link-primary": "text-primary hover:text-primary-dark transition-colors",
		"text-logo": "text-body text-lg no-underline transition-colors hover:text-primary",
		"service-card-surface":
			"!border !border-primary-border !rounded-md bg-surface bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(248,250,252,0.82))] !shadow-[0_1px_2px_rgba(71,85,105,0.06),0_18px_42px_rgba(71,85,105,0.10)] transition-[transform,border-color,box-shadow] duration-[180ms] ease-[ease]",
		"service-card-surface-hover":
			"hover:translate-y-[-3px] hover:!border-primary-hover hover:!shadow-[0_3px_8px_rgba(71,85,105,0.08),0_24px_58px_rgba(71,85,105,0.15)]",
	},
})
