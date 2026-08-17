import type { ImageMetadata } from "astro";

type ImageModule = { default: ImageMetadata };

/**
 * Every locally-bundled image, keyed by its path relative to the project root.
 *
 * Images live in `src/` (not `public/`) so Astro can optimize them: generate
 * responsive WebP variants, hash filenames for immutable caching, and emit
 * intrinsic dimensions. `public/` is byte-for-byte passthrough and bypasses
 * all of that.
 */
const localImages = import.meta.glob<ImageModule>(
	[
		"/src/assets/projects/**/*.{jpeg,jpg,png,webp,avif,svg}",
		"/src/content/blog/**/*.{jpeg,jpg,png,webp,avif,svg}",
	],
	{ eager: true },
);

/**
 * Maps the public-style paths stored in `src/data/projects.ts` to the
 * corresponding module in `src/`. Keeping the data file's paths stable means
 * project data stays readable and free of import boilerplate.
 */
const PATH_PREFIXES: ReadonlyArray<readonly [string, string]> = [
	["/projects/", "/src/assets/projects/"],
	["/blog/", "/src/content/blog/"],
];

function toModuleKey(src: string): string | null {
	for (const [from, to] of PATH_PREFIXES) {
		if (src.startsWith(from)) return to + src.slice(from.length);
	}
	return null;
}

export function isRemoteImageSrc(src: string): boolean {
	return src.startsWith("http://") || src.startsWith("https://");
}

/**
 * Resolves an image path to `ImageMetadata` when the file is bundled in `src/`,
 * so callers can hand it to `<Image>`/`getImage()` for optimization.
 *
 * Falls back to the original string for remote URLs and for anything still
 * served from `public/`, which `<Image>` handles as a passthrough.
 */
export function resolveImage(src: string): ImageMetadata | string {
	if (isRemoteImageSrc(src)) return src;
	const key = toModuleKey(src);
	if (!key) return src;
	return localImages[key]?.default ?? src;
}

export function resolveProjectHero(
	_slug: string,
	fallbackSrc: string,
): ImageMetadata | string {
	return resolveImage(fallbackSrc);
}

export function getProjectHeroUrl(slug: string, fallbackSrc: string): string {
	const resolved = resolveProjectHero(slug, fallbackSrc);
	return typeof resolved === "string" ? resolved : resolved.src;
}
