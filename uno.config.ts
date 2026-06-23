import { defineConfig, presetMini, presetIcons, transformerDirectives } from "unocss"


export default defineConfig({
	safelist: [
		"i-lucide-rocket",
		"i-lucide-github",
		"i-lucide-play",
		"i-simple-icons-android",
		"i-simple-icons-apple",
		"i-lucide-sun",
		"i-lucide-moon",
		"i-lucide-arrow-right",
		"i-lucide-arrow-left",
		"i-lucide-send",
		"i-lucide-chevron-down",
		"i-lucide-x",
		"i-lucide-chevron-left",
		"i-lucide-chevron-right",
		"i-lucide-zoom-in",
		"i-lucide-check",
		"i-lucide-layout-grid",
		"i-lucide-smartphone",
		"i-lucide-shopping-bag",
		"i-lucide-bot",
		"i-lucide-terminal",
		"i-lucide-sparkles",
	],
	presets: [
		presetMini(),
		presetIcons({
			collections: {
				lucide: () => import("@iconify-json/lucide/icons.json").then(i => i.default),
				"simple-icons": () => import("@iconify-json/simple-icons/icons.json").then(i => i.default),
			}
		})
	],
	transformers: [
		transformerDirectives(),
	],
	rules: [
		["object-cover", { "object-fit": "cover" }],
		["uppercase", { "text-transform": "uppercase" }],
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
		"site-container": "w-full max-w-[900px] mx-auto px-4",
		"page-container": "w-[720px] max-w-[calc(100%-2em)] mx-auto px-6 py-12",
		"page-container-wide": "w-[960px] max-w-[calc(100%-2em)] mx-auto px-6 py-12",
		"surface-card": "rounded-xl bg-surface shadow-md",
		"meta-text": "text-muted",
		"content-prose": "text-body leading-[1.7]",
		"section-title": "mb-2 text-body leading-tight",
		"link-primary": "text-primary hover:text-primary-dark transition-colors",
		"text-logo": "text-body text-lg no-underline transition-colors hover:text-primary",
		"card-surface":
			"border border-[var(--form-panel-border)] rounded-2xl bg-surface shadow-[0_1px_2px_rgb(var(--color-secondary)/0.06),0_4px_14px_rgb(var(--color-secondary)/0.05)]",
		"service-card-surface":
			"!border !border-[var(--form-panel-border)] !rounded-2xl !bg-surface !shadow-[0_1px_2px_rgb(var(--color-secondary)/0.06),0_4px_14px_rgb(var(--color-secondary)/0.05)] transition-[border-color,box-shadow,background-color] duration-150 ease-out",
		"service-card-surface-hover":
			"hover:!border-primary/25 hover:!shadow-[0_2px_6px_rgb(var(--color-secondary)/0.08),0_8px_20px_rgb(var(--color-secondary)/0.07)]",
		"form-panel":
			"rounded-2xl border border-[var(--form-panel-border)] bg-surface shadow-[0_1px_2px_rgb(var(--color-secondary)/0.04)]",
		"form-label":
			"block text-[13px] font-medium text-muted leading-snug tracking-[0.01em]",
		"form-label-compact":
			"block text-xs font-medium text-muted leading-snug tracking-[0.02em]",
		"form-control":
			"box-border w-full min-w-0 h-10 rounded-md border border-[var(--form-field-border)] bg-background px-3.5 text-sm text-body leading-none shadow-none transition-[border-color,background-color] duration-150 ease-out focus-visible:outline-none focus-visible:border-[var(--form-field-border-focus)] focus-visible:ring-2 focus-visible:ring-primary/15 focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-50",
		"form-control-compact":
			"box-border w-full min-w-0 h-9 rounded-md border border-[var(--form-field-border)] bg-background px-3 text-sm text-body leading-none shadow-none transition-[border-color,background-color] duration-150 ease-out focus-visible:outline-none focus-visible:border-[var(--form-field-border-focus)] focus-visible:ring-2 focus-visible:ring-primary/15 focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-50",
		"form-textarea":
			"box-border w-full min-w-0 min-h-[120px] rounded-md border border-[var(--form-field-border)] bg-background px-3.5 py-2.5 text-sm text-body leading-normal shadow-none resize-y transition-[border-color,background-color] duration-150 ease-out focus-visible:outline-none focus-visible:border-[var(--form-field-border-focus)] focus-visible:ring-2 focus-visible:ring-primary/15 focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-50",
		"form-textarea-compact":
			"box-border w-full min-w-0 min-h-[100px] rounded-md border border-[var(--form-field-border)] bg-background px-3 py-2.5 text-sm text-body leading-normal shadow-none resize-y transition-[border-color,background-color] duration-150 ease-out focus-visible:outline-none focus-visible:border-[var(--form-field-border-focus)] focus-visible:ring-2 focus-visible:ring-primary/15 focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-50",
		"form-control-error":
			"!border-red-400/70 focus-visible:!border-red-500 focus-visible:ring-red-500/15",
		"form-description": "mt-1 text-xs text-muted leading-relaxed",
		"form-message": "mt-1 text-xs font-medium text-red-600/90",
		"form-alert": "rounded-lg px-3.5 py-3 text-sm leading-normal",
		"form-alert-success":
			"border border-primary/12 bg-primary-soft/70 text-body",
		"form-alert-error":
			"border border-red-200/80 bg-red-50/90 text-red-700",
	},
})
