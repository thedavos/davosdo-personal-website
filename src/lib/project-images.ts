import type { ImageMetadata } from "astro";
import global66Hero from "@/assets/projects/global66/g66_home.webp";
import interbankHero from "@/assets/projects/interbank/ibk_cambio_moneda_inicio.webp";
import rutasecHero from "@/assets/projects/rutasec/rutasec_home.webp";

const heroBySlug: Record<string, ImageMetadata> = {
	interbank: interbankHero,
	global66: global66Hero,
	rutasec: rutasecHero,
};

export function resolveProjectHero(
	slug: string,
	fallbackSrc: string,
): ImageMetadata | string {
	return heroBySlug[slug] ?? fallbackSrc;
}

export function getProjectHeroUrl(slug: string, fallbackSrc: string): string {
	const resolved = resolveProjectHero(slug, fallbackSrc);
	return typeof resolved === "string" ? resolved : resolved.src;
}

export function isRemoteImageSrc(src: string): boolean {
	return src.startsWith("http://") || src.startsWith("https://");
}
