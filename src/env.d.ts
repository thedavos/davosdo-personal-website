/// <reference types="astro/client" />

declare global {
	const __SITE_CONFIG__: any;
}

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
	interface Locals extends Runtime { }
}

interface ImportMetaEnv {
	readonly BASE_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
