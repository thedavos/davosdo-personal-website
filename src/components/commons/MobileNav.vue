<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import LanguageSwitcher from "@/components/commons/LanguageSwitcher.vue";

interface NavItem {
	href: string;
	label: string;
}

interface Props {
	navItems: NavItem[];
	currentPath: string;
}

const props = defineProps<Props>();

const isOpen = ref(false);
const panel = ref<HTMLElement | null>(null);
const trigger = ref<HTMLButtonElement | null>(null);
const firstLink = ref<HTMLAnchorElement | null>(null);
const drawerId = "mobile-navigation-drawer";
let previousBodyOverflow = "";

const currentSegment = computed(() => props.currentPath.match(/[^/]+/g)?.[0] ?? "");

const isLinkActive = (href: string) =>
	href === props.currentPath || href === `/${currentSegment.value}`;

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
		previousBodyOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		await nextTick();
		firstLink.value?.focus() ?? panel.value?.focus();
		return;
	}

	document.body.style.overflow = previousBodyOverflow;
});

onMounted(() => {
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
				aria-label="Navegación móvil"
				tabindex="-1"
			>
				<div class="mobile-nav__content">
					<div class="mobile-nav__panel-actions">
						<button
							type="button"
							class="mobile-nav__close"
							aria-label="Cerrar menú de navegación"
							@click="closeMenu"
						>
							<span class="mobile-nav__close-icon i-lucide-x" aria-hidden="true" />
						</button>
					</div>

					<nav class="mobile-nav__links" aria-label="Navegación móvil">
						<p class="mobile-nav__eyebrow">Navegación</p>
						<a
							v-for="(item, index) in navItems"
							:key="item.href"
							:ref="(element) => { if (index === 0) firstLink = element as HTMLAnchorElement | null; }"
							:href="item.href"
							class="mobile-nav__link"
							:class="{ 'mobile-nav__link--active': isLinkActive(item.href) }"
							:aria-current="isLinkActive(item.href) ? 'page' : undefined"
							@click="closeMenu"
						>
							{{ item.label }}
						</a>
					</nav>

					<div class="mobile-nav__language">
						<p class="mobile-nav__eyebrow">Idioma</p>
						<LanguageSwitcher variant="panel" />
					</div>
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
		border: 1px solid var(--color-border);
		border-radius: 14px;
		background: rgba(255, 255, 255, 0.92);
		color: var(--color-text);
		cursor: pointer;
		transition:
			border-color 160ms ease,
			background-color 160ms ease,
			color 160ms ease,
			transform 160ms ease;
	}

	.menu-trigger:hover {
		border-color: rgba(99, 102, 241, 0.28);
		color: var(--color-primary);
	}

	.menu-trigger:focus-visible {
		outline: 2px solid rgba(99, 102, 241, 0.35);
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
		background: rgba(15, 23, 42, 0.42);
		backdrop-filter: blur(4px);
	}

	.mobile-nav__panel {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 30;
		width: min(24rem, calc(100vw - 1.25rem));
		border-left: 1px solid var(--color-border);
		background: rgba(255, 255, 255, 0.98);
		box-shadow: -24px 0 48px rgba(15, 23, 42, 0.14);
	}

	.mobile-nav__content {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		height: 100%;
		padding: 1rem;
	}

	.mobile-nav__panel-actions {
		display: flex;
		justify-content: flex-end;
	}

	.mobile-nav__close {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.75rem;
		height: 2.75rem;
		padding: 0;
		border: 1px solid var(--color-border);
		border-radius: 14px;
		background: rgba(255, 255, 255, 0.92);
		color: var(--color-text);
		cursor: pointer;
		transition:
			border-color 160ms ease,
			background-color 160ms ease,
			color 160ms ease,
			transform 160ms ease;
	}

	.mobile-nav__close:hover {
		border-color: rgba(99, 102, 241, 0.28);
		color: var(--color-primary);
	}

	.mobile-nav__close:focus-visible {
		outline: 2px solid rgba(99, 102, 241, 0.35);
		outline-offset: 3px;
	}

	.mobile-nav__close-icon {
		display: inline-flex;
		width: 1.1rem;
		height: 1.1rem;
		flex-shrink: 0;
	}

	.mobile-nav__language {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding-bottom: 1.25rem;
		border-bottom: 1px solid var(--color-border);
	}

	.mobile-nav__eyebrow {
		margin: 0;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-text-muted);
	}

	.mobile-nav__links {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.mobile-nav__link {
		display: block;
		padding: 0.8rem 1rem;
		border-radius: 16px;
		text-decoration: none;
		font-size: 1rem;
		font-weight: 400;
		color: var(--color-text);
		transition:
			background-color 160ms ease,
			color 160ms ease;
	}

	.mobile-nav__link:hover {
		background: rgba(99, 102, 241, 0.08);
		color: var(--color-primary);
	}

	.mobile-nav__link:focus-visible {
		outline: 2px solid rgba(99, 102, 241, 0.35);
		outline-offset: 3px;
	}

	.mobile-nav__link--active {
		font-weight: 700;
		background: rgba(99, 102, 241, 0.1);
		color: var(--color-primary);
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
</style>
