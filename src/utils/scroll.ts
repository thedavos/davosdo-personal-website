function prefersReducedMotion() {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function easeOutCubic(progress: number) {
	return 1 - Math.pow(1 - progress, 3);
}

function scrollOffset(element: HTMLElement) {
	const margin = Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
	const padding =
		Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) ||
		0;

	return margin + padding;
}

function animateScrollTo(targetY: number) {
	if (prefersReducedMotion()) {
		window.scrollTo(0, targetY);
		return;
	}

	const startY = window.scrollY;
	const distance = targetY - startY;
	if (Math.abs(distance) < 2) return;

	const duration = Math.min(820, Math.max(460, Math.abs(distance) * 0.42));
	const startTime = performance.now();

	const step = (now: number) => {
		const progress = Math.min((now - startTime) / duration, 1);
		window.scrollTo(0, startY + distance * easeOutCubic(progress));
		if (progress < 1) requestAnimationFrame(step);
	};

	requestAnimationFrame(step);
}

/** Smooth-scrolls to an element, honoring its scroll margin and the page's scroll padding. */
export function scrollToElement(element: HTMLElement) {
	const top = element.getBoundingClientRect().top + window.scrollY;
	animateScrollTo(Math.max(0, top - scrollOffset(element)));
}

function samePageSection(url: URL) {
	if (!url.hash || url.hash === "#") return null;
	if (url.origin !== window.location.origin) return null;
	if (url.pathname !== window.location.pathname) return null;

	const id = decodeURIComponent(url.hash.slice(1));
	const section = document.getElementById(id);
	return section instanceof HTMLElement ? section : null;
}

/**
 * Animates clicks on same-page hash links. Safe to call again after a Swup
 * visit: the listener is registered once.
 */
export function bindSamePageHashLinks() {
	const win = window as Window & { __samePageHashScrollBound?: boolean };
	if (win.__samePageHashScrollBound) return;
	win.__samePageHashScrollBound = true;

	document.addEventListener(
		"click",
		(event) => {
			if (
				event.defaultPrevented ||
				event.metaKey ||
				event.ctrlKey ||
				event.shiftKey ||
				event.altKey ||
				event.button !== 0
			) {
				return;
			}

			const link = (event.target as HTMLElement | null)?.closest("a[href]");
			if (!(link instanceof HTMLAnchorElement)) return;

			const section = samePageSection(new URL(link.href, window.location.href));
			if (!section) return;

			event.preventDefault();
			event.stopImmediatePropagation();
			history.pushState(null, "", link.hash);
			scrollToElement(section);
		},
		{ capture: true },
	);
}
