const projectFilterAnimations = new WeakMap<HTMLElement, Animation>();

function prefersReducedProjectMotion() {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function splitFilterTokens(value: string | undefined): string[] {
	return value?.split(/\s+/).filter(Boolean) ?? [];
}

function stopProjectFilterAnimations(cards: HTMLElement[]) {
	cards.forEach((card) => {
		projectFilterAnimations.get(card)?.cancel();
		projectFilterAnimations.delete(card);
	});
}

function animateProjectCard(
	card: HTMLElement,
	keyframes: Keyframe[],
	options: KeyframeAnimationOptions,
) {
	const animation = card.animate(keyframes, options);
	projectFilterAnimations.set(card, animation);

	const cleanUp = () => {
		if (projectFilterAnimations.get(card) === animation) {
			projectFilterAnimations.delete(card);
		}
	};

	animation.addEventListener("finish", cleanUp, { once: true });
	animation.addEventListener("cancel", cleanUp, { once: true });
}

function initProjectFilters(scope: ParentNode = document) {
	const roots = scope.querySelectorAll<HTMLElement>(
		"[data-project-filter-root]",
	);

	roots.forEach((root) => {
		if (root.dataset.projectFilterInitialized === "true") return;

		const chips = Array.from(
			root.querySelectorAll<HTMLButtonElement>("[data-project-filter-chip]"),
		);
		const cards = Array.from(
			root.querySelectorAll<HTMLElement>("[data-project-filter-tokens]"),
		);
		const clearButton = root.querySelector<HTMLButtonElement>(
			"[data-project-filter-clear]",
		);
		const count = root.querySelector<HTMLElement>(
			"[data-project-filter-count]",
		);
		const emptyState = root.querySelector<HTMLElement>(
			"[data-project-filter-empty]",
		);
		const grid = root.querySelector<HTMLElement>(
			"[data-project-filter-grid]",
		);

		if (!clearButton || !count || !emptyState || !grid) return;

		root.dataset.projectFilterInitialized = "true";

		const applyFilters = () => {
			stopProjectFilterAnimations(cards);

			const firstPositions = new Map<HTMLElement, DOMRect>();
			cards.forEach((card) => {
				if (!card.hidden) {
					firstPositions.set(card, card.getBoundingClientRect());
				}
			});

			const selectedChips = chips.filter(
				(chip) => chip.getAttribute("aria-pressed") === "true",
			);
			const selectedTokens = new Set(
				selectedChips.flatMap((chip) =>
					splitFilterTokens(chip.dataset.filterTokens),
				),
			);
			const hasSelection = selectedChips.length > 0;

			let visibleCount = 0;
			cards.forEach((card) => {
				const projectTokens = splitFilterTokens(
					card.dataset.projectFilterTokens,
				);
				const matches =
					!hasSelection ||
					projectTokens.some((token) => selectedTokens.has(token));

				card.hidden = !matches;
				if (matches) visibleCount += 1;
			});

			count.textContent = `${visibleCount} ${visibleCount === 1 ? "proyecto" : "proyectos"}`;
			clearButton.hidden = !hasSelection;
			emptyState.hidden = visibleCount > 0;
			grid.setAttribute(
				"aria-label",
				`${visibleCount} ${visibleCount === 1 ? "proyecto destacado" : "proyectos destacados"}`,
			);

			if (prefersReducedProjectMotion()) return;

			cards.forEach((card) => {
				if (card.hidden) return;

				const lastPosition = card.getBoundingClientRect();
				const firstPosition = firstPositions.get(card);

				if (!firstPosition) {
					animateProjectCard(
						card,
						[
							{ opacity: 0, transform: "translateY(12px) scale(0.985)" },
							{ opacity: 1, transform: "translateY(0) scale(1)" },
						],
						{
							duration: 260,
							easing: "cubic-bezier(0.16, 1, 0.3, 1)",
						},
					);
					return;
				}

				const deltaX = firstPosition.left - lastPosition.left;
				const deltaY = firstPosition.top - lastPosition.top;
				if (Math.abs(deltaX) < 1 && Math.abs(deltaY) < 1) return;

				animateProjectCard(
					card,
					[
						{ transform: `translate(${deltaX}px, ${deltaY}px)` },
						{ transform: "translate(0, 0)" },
					],
					{
						duration: 320,
						easing: "cubic-bezier(0.16, 1, 0.3, 1)",
					},
				);
			});
		};

		chips.forEach((chip) => {
			chip.addEventListener("click", () => {
				const isSelected = chip.getAttribute("aria-pressed") === "true";
				chip.setAttribute("aria-pressed", String(!isSelected));
				applyFilters();
			});
		});

		clearButton.addEventListener("click", () => {
			chips.forEach((chip) => chip.setAttribute("aria-pressed", "false"));
			applyFilters();
		});
	});
}

export function setupProjectFilters() {
	const win = window as Window & { __projectFiltersBound?: boolean };

	initProjectFilters();
	if (win.__projectFiltersBound) return;

	win.__projectFiltersBound = true;
	// `astro:after-swap` only. It fires at content replacement, ahead of
	// `astro:page-load`, so the grid is never briefly interactive without its
	// filters. Listening to both ran `initProjectFilters` twice per navigation,
	// three times once you count the `reloadScripts` re-execution of this module.
	document.addEventListener("astro:after-swap", () => initProjectFilters());
}
