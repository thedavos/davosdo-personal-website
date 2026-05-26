import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import unocss from "@unocss/astro";
import vue from "@astrojs/vue";
import swup from "@swup/astro";

import cloudflare from "@astrojs/cloudflare";
import { siteConfig } from "./src/config.ts";

export default defineConfig({
	site: siteConfig.site,
	image: {
		remotePatterns: [{ protocol: "https", hostname: "placehold.co" }],
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: "Geist Sans",
			cssVariable: "--font-geist-sans",
			fallbacks: ["sans-serif"],
			options: {
				variants: [
					{
						src: ["./src/assets/fonts/geist/Geist-Variable.woff2"],
						weight: "100 900",
						style: "normal",
					},
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: "Geist Mono",
			cssVariable: "--font-geist-mono",
			fallbacks: [
				"ui-monospace",
				"SFMono-Regular",
				"Menlo",
				"Monaco",
				"Consolas",
				"Liberation Mono",
				"Courier New",
				"monospace",
			],
			options: {
				variants: [
					{
						src: ["./src/assets/fonts/geist/GeistMono-Variable.woff2"],
						weight: "100 900",
						style: "normal",
					},
				],
			},
		},
	],
	devToolbar: {
		enabled: true,
	},
	integrations: [
		mdx(),
		sitemap(),
		unocss(),
		vue(),
		swup({
			theme: false,
			animationClass: 'transition-swup-',
			containers: ['#swup-container'],
			smoothScrolling: false,
			cache: process.env.NODE_ENV === 'production',
			preload: true,
			accessibility: false,
			morph: ['header'],
			updateHead: true,
			updateBodyClass: false,
			reloadScripts: true,
			globalInstance: true,
			loadOnIdle: false,
			debug: process.env.NODE_ENV !== 'production',
			ignore: [
				'a[target="_blank"]',
				'a[download]',
				'a[href^="mailto:"]',
				'a[href^="tel:"]',
			],
		}),
	],
	adapter: cloudflare(),
	vite: {
		build: {
			rollupOptions: {
				output: {
					assetFileNames: "_astro/[hash][extname]",
				},
			},
		},
		assetsInclude: ['**/*.base', '**/*.home', '**/*.base'],
		server: {
			host: 'localhost',
			port: 5000,
			strictPort: false,
			allowedHosts: [],
			middlewareMode: false,
			hmr: true,
			watch: {
				ignored: ['**/.obsidian/**', '**/_bases/**', '**/bases/**'],
				interval: 1000
			},
			headers: {
				'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
			}
		},
		define: {
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
			'process.env.ASTRO_CONTENT_COLLECTION_CACHE': 'false'
		},
		optimizeDeps: {
			exclude: [
				'astro:content',
				'astro/content',
				'astro/content/runtime',
				'astro_content_runtime',
			]
		}
	}
});
