import type { LocalImageService } from "astro";
import workerdService from "@astrojs/cloudflare/image-service-workerd";

/**
 * The Cloudflare image endpoint only forwards a quality setting when the
 * generated URL carries a `q` parameter (see `image-binding-transform.js` in
 * `@astrojs/cloudflare`). Without it the Images binding falls back to a
 * near-lossless encode: a 852x1064 WebP came back at 641 KB unqualified versus
 * 76 KB at `q=80` -- larger than the original source file.
 *
 * Astro has no global quality option, and Markdown images cannot pass one per
 * image, so the default is injected here instead. Explicit `quality` props on
 * `<Image>` / `getImage()` still win.
 */
const DEFAULT_QUALITY = 80;

const service: LocalImageService = {
	...workerdService,
	getURL(options, config) {
		return workerdService.getURL(
			{ ...options, quality: options.quality ?? DEFAULT_QUALITY },
			config,
		);
	},
};

export default service;
