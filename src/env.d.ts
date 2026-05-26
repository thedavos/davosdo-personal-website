/// <reference types="astro/client" />
/// <reference path="../worker-configuration.d.ts" />

declare global {
	const __SITE_CONFIG__: any;
}

type Runtime = import("@astrojs/cloudflare").Runtime;

declare namespace App {
	interface Locals extends Runtime {}
}

interface ImportMetaEnv {
	readonly BASE_URL: string;
	readonly CONTACT_FROM_EMAIL?: string;
	readonly CONTACT_TO_EMAIL?: string;
	readonly PUBLIC_TURNSTILE_SITE_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare namespace Cloudflare {
	interface Env {
		TURNSTILE_SECRET_KEY: string;
	}
}
