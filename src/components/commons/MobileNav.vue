<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import type { NavigationItem } from "@/types";

interface Props {
	navItems: NavigationItem[];
	currentPath: string;
}

const props = defineProps<Props>();

const isOpen = ref(false);
const panel = ref<HTMLElement | null>(null);
const trigger = ref<HTMLButtonElement | null>(null);
const firstLink = ref<HTMLAnchorElement | null>(null);
const theme = ref<"light" | "dark">("light");
const drawerId = "mobile-navigation-drawer";
let previousBodyOverflow = "";

const readTheme = (): "light" | "dark" => {
	if (typeof document === "undefined") return "light";
	return document.documentElement.getAttribute("data-theme") === "dark"
		? "dark"
		: "light";
};

const syncTheme = () => {
	theme.value = readTheme();
};

const setTheme = (next: "light" | "dark") => {
	if (typeof document === "undefined") return;

	const root = document.documentElement;
	root.classList.add("theme-transition");
	window.setTimeout(() => root.classList.remove("theme-transition"), 300);

	root.setAttribute("data-theme", next);
	localStorage.setItem("theme", next);
	root.classList.toggle("dark", next === "dark");
	theme.value = next;
};

const toggleTheme = () => {
	setTheme(theme.value === "dark" ? "light" : "dark");
};

const getCurrentPath = () =>
	typeof window === "undefined" ? props.currentPath : window.location.pathname;

const isLinkActive = (href: string) => {
	const currentPath = getCurrentPath();
	const currentSegment = currentPath.match(/[^/]+/g)?.[0] ?? "";

	return href === currentPath || href === `/${currentSegment}`;
};

const closeMenu = () => {
	isOpen.value = false;
};

const toggleMenu = () => {
	isOpen.value = !isOpen.value;
};

const onWindowKeydown = (event: KeyboardEvent) => {
	if (event.key !== "Escape" || !isOpen.value) return;

	closeMenu();
	nextTick(() => trigger.value?.focus());
};

const onResize = () => {
	if (window.innerWidth >= 768 && isOpen.value) closeMenu();
};

watch(isOpen, async (open) => {
	if (typeof document === "undefined") return;

	if (open) {
		syncTheme();
		previousBodyOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		await nextTick();
		firstLink.value?.focus() ?? panel.value?.focus();
		return;
	}

	document.body.style.overflow = previousBodyOverflow;
});

onMounted(() => {
	syncTheme();
	window.addEventListener("keydown", onWindowKeydown);
	window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
	window.removeEventListener("keydown", onWindowKeydown);
	window.removeEventListener("resize", onResize);
	if (typeof document !== "undefined") {
		document.body.style.overflow = previousBodyOverflow;
	}
});
</script>

<template>
	<div class="mobile-nav">
		<button
			ref="trigger"
			type="button"
			class="menu-trigger"
			aria-label="Abrir menú de navegación"
			:aria-expanded="isOpen"
			:aria-controls="drawerId"
			@click="toggleMenu"
		>
			<span class="sr-only">Menú</span>
			<span class="menu-trigger__icon i-lucide-menu" aria-hidden="true" />
		</button>

		<Transition name="mobile-nav-fade">
			<div
				v-if="isOpen"
				class="mobile-nav__overlay"
				aria-hidden="true"
				@click="closeMenu"
			/>
		</Transition>

		<Transition name="mobile-nav-drawer">
			<aside
				v-if="isOpen"
				:id="drawerId"
				ref="panel"
				class="mobile-nav__panel"
				role="dialog"
				aria-modal="true"
				aria-label="Menú de navegación"
				tabindex="-1"
			>
				<div class="mobile-nav__content">
					<header class="mobile-nav__header">
						<p class="mobile-nav__title" id="mobile-nav-title">Menú</p>
						<div class="mobile-nav__header-actions">
							<button
								type="button"
								class="mobile-nav__header-action"
								aria-label="Cambiar tema"
								@click="toggleTheme"
							>
								<span
									v-if="theme === 'light'"
									class="mobile-nav__header-action-icon i-lucide-sun"
									aria-hidden="true"
								/>
								<span
									v-else
									class="mobile-nav__header-action-icon i-lucide-moon"
									aria-hidden="true"
								/>
							</button>
							<span class="mobile-nav__header-divider" aria-hidden="true" />
							<button
								type="button"
								class="mobile-nav__header-action"
								aria-label="Cerrar menú de navegación"
								@click="closeMenu"
							>
								<span
									class="mobile-nav__header-action-icon i-lucide-x"
									aria-hidden="true"
								/>
							</button>
						</div>
					</header>

					<nav
						class="mobile-nav__menu"
						aria-labelledby="mobile-nav-title"
					>
						<ul class="mobile-nav__list">
							<li
								v-for="(item, index) in navItems"
								:key="item.url"
								class="mobile-nav__item"
							>
								<a
									:ref="(element) => { if (index === 0) firstLink = element as HTMLAnchorElement | null; }"
									:href="item.url"
									class="mobile-nav__link"
									:class="{ 'mobile-nav__link--active': isLinkActive(item.url) }"
									:aria-current="isLinkActive(item.url) ? 'page' : undefined"
									@click="closeMenu"
								>
									{{ item.title }}
								</a>
							</li>
							<li class="mobile-nav__item">
								<a
									href="/#contacto"
									class="mobile-nav__link mobile-nav__link--cta"
									data-no-swup
									@click="closeMenu"
								>
									<span class="mobile-nav__link-label">Hablemos</span>
									<span
										class="mobile-nav__link-icon i-lucide-arrow-up-right"
										aria-hidden="true"
									/>
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</aside>
		</Transition>
	</div>
</template>

<style scoped>
	.mobile-nav {
		display: flex;
		align-items: center;
	}

	.menu-trigger {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		padding: 0;
		border: 1px solid rgb(var(--color-border));
		border-radius: 14px;
		background: rgb(var(--color-surface) / 0.92);
		color: rgb(var(--color-body));
		cursor: pointer;
		transition:
			border-color 160ms ease,
			background-color 160ms ease,
			color 160ms ease;
	}

	.menu-trigger:hover {
		border-color: var(--color-primary-border);
		color: rgb(var(--color-primary));
	}

	.menu-trigger:focus-visible {
		outline: 2px solid var(--color-primary-hover);
		outline-offset: 3px;
	}

	.menu-trigger__icon {
		display: inline-flex;
		width: 1.1rem;
		height: 1.1rem;
		flex-shrink: 0;
	}

	.mobile-nav__overlay {
		position: fixed;
		inset: 0;
		z-index: 29;
		background: rgb(var(--color-body)/ 0.42);
		backdrop-filter: blur(4px);
	}

	.mobile-nav__panel {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 30;
		width: min(22rem, calc(100vw - 1.25rem));
		border-left: 1px solid rgb(var(--color-border));
		background: rgb(var(--color-surface) / 0.98);
		box-shadow: -24px 0 48px var(--color-card-border);
	}

	.mobile-nav__content {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		height: 100%;
		padding: 1rem;
	}

	.mobile-nav__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid rgb(var(--color-border));
	}

	.mobile-nav__title {
		margin: 0;
		font-size: 0.95rem;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: rgb(var(--color-body));
	}

	.mobile-nav__header-actions {
		display: flex;
		align-items: center;
		gap: 0.15rem;
	}

	.mobile-nav__header-action {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		padding: 0;
		border: 0;
		border-radius: 999px;
		background: transparent;
		color: rgb(var(--color-text-muted));
		font: inherit;
		cursor: pointer;
		transition:
			background-color 160ms ease,
			color 160ms ease;
	}

	.mobile-nav__header-action:hover {
		background: var(--color-primary-soft);
		color: rgb(var(--color-body));
	}

	.mobile-nav__header-action:focus-visible {
		outline: 2px solid var(--color-primary-hover);
		outline-offset: 2px;
	}

	.mobile-nav__header-action-icon {
		display: inline-flex;
		width: 1.15rem;
		height: 1.15rem;
		flex-shrink: 0;
	}

	.mobile-nav__header-divider {
		width: 1px;
		height: 1.25rem;
		margin-inline: 0.15rem;
		background: rgb(var(--color-border));
	}

	.mobile-nav__menu {
		flex: 0 0 auto;
	}

	.mobile-nav__list {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.mobile-nav__item {
		margin: 0;
	}

	.mobile-nav__link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 0.85rem 1rem;
		border-radius: 14px;
		text-decoration: none;
		font-size: 1rem;
		font-weight: 500;
		line-height: 1.2;
		color: rgb(var(--color-body));
		transition:
			background-color 160ms ease,
			color 160ms ease;
	}

	.mobile-nav__link:hover {
		background: rgb(var(--color-body) / 0.05);
		color: rgb(var(--color-body));
	}

	.mobile-nav__link:focus-visible {
		outline: 2px solid var(--color-primary-hover);
		outline-offset: 3px;
	}

	.mobile-nav__link--active {
		font-weight: 600;
		background: rgb(var(--color-body) / 0.05);
		color: rgb(var(--color-body));
	}

	.mobile-nav__link--cta {
		margin-top: 0.35rem;
		border: 1px solid rgb(var(--color-primary));
		background: rgb(var(--color-primary));
		color: rgb(var(--color-on-primary));
		font-weight: 600;
	}

	.mobile-nav__link--cta:hover {
		border-color: rgb(var(--color-primary-dark));
		background: rgb(var(--color-primary-dark));
		color: rgb(var(--color-on-primary));
	}

	.mobile-nav__link--cta .mobile-nav__link-icon {
		opacity: 0.9;
	}

	.mobile-nav__link-label {
		flex: 1;
	}

	.mobile-nav__link-icon {
		display: inline-flex;
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
		opacity: 0.72;
	}

	.mobile-nav-fade-enter-active,
	.mobile-nav-fade-leave-active {
		transition: opacity 180ms ease;
	}

	.mobile-nav-fade-enter-from,
	.mobile-nav-fade-leave-to {
		opacity: 0;
	}

	.mobile-nav-drawer-enter-active,
	.mobile-nav-drawer-leave-active {
		transition:
			transform 220ms ease,
			opacity 220ms ease;
	}

	.mobile-nav-drawer-enter-from,
	.mobile-nav-drawer-leave-to {
		opacity: 0;
		transform: translateX(100%);
	}

	@media (min-width: 768px) {
		.mobile-nav {
			display: none;
		}
	}

	@media (max-width: 640px) {
		.mobile-nav__panel {
			width: 100%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.menu-trigger,
		.mobile-nav__header-action,
		.mobile-nav__link {
			transition: none;
		}

		.mobile-nav-fade-enter-active,
		.mobile-nav-fade-leave-active,
		.mobile-nav-drawer-enter-active,
		.mobile-nav-drawer-leave-active {
			transition: none;
		}
	}
</style>
