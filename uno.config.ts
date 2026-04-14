import { defineConfig, presetMini, presetIcons, transformerDirectives } from "unocss"


export default defineConfig({
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
	theme: {
		colors: {
			primary: "#6366F1",
			"primary-dark": "#4F46E5",
			secondary: "#475569",
			tertiary: "#B95F00",
			neutral: "#F8FAFC",
			background: "#F8FAFC",
			surface: "#FFFFFF",
			body: "#1E293B",
			muted: "#475569",
			border: "#F1F5F9",
		},
		fontFamily: {
			sans: "Atkinson, sans-serif",
		},
		boxShadow: {
			soft: "0 2px 8px rgba(71, 85, 105, 0.10), 0 12px 28px rgba(71, 85, 105, 0.14)",
		},
	},
	shortcuts: {
		"page-container": "w-[720px] max-w-[calc(100%-2em)] mx-auto px-4 py-12",
		"page-container-wide": "w-[960px] max-w-[calc(100%-2em)] mx-auto px-4 py-12",
		"surface-card": "rounded-xl bg-surface shadow-soft",
		"meta-text": "text-muted",
		"content-prose": "text-body leading-[1.7]",
		"section-title": "mb-2 text-body leading-tight",
		"link-primary": "text-primary hover:text-primary-dark transition-colors",
		"text-logo": "text-body no-underline transition-colors hover:text-primary",
	},
})
