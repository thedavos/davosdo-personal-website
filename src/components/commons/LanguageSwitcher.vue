<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import EnFlag from "@/assets/flags/en.svg?url";
import EsFlag from "@/assets/flags/es.svg?url";
import PtFlag from "@/assets/flags/pt.svg?url";

interface LanguageOption {
	code: string;
	label: string;
	flag?: string;
}

type LanguageSwitcherVariant = "compact" | "panel";

interface Props {
	languages?: LanguageOption[];
	defaultLanguage?: string;
	storageKey?: string;
	variant?: LanguageSwitcherVariant;
}

const props = withDefaults(defineProps<Props>(), {
	languages: () => [
		{ code: "en", label: "Inglés", flag: EnFlag },
		{ code: "es", label: "Español", flag: EsFlag },
		{ code: 'pt', label: 'Portugués', flag: PtFlag }
	],
	defaultLanguage: "es",
	storageKey: "preferred-language",
	variant: "compact",
});

const root = ref<HTMLElement | null>(null);
const trigger = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const selectedLanguage = ref("");

const availableLanguages = computed(
	() => new Map(props.languages.map((language) => [language.code, language])),
);

const resolveLanguageCode = (languageCode?: string | null) => {
	if (!languageCode) return undefined;

	const normalizedLanguageCode = languageCode.toLowerCase();

	return props.languages.find(({ code }) => {
		const normalizedCode = code.toLowerCase();

		return (
			normalizedLanguageCode === normalizedCode ||
			normalizedLanguageCode.startsWith(`${normalizedCode}-`)
		);
	})?.code;
};

const defaultLanguageCode = computed(
	() => resolveLanguageCode(props.defaultLanguage) ?? props.languages[0]?.code ?? "",
);

const currentLanguage = computed(
	() =>
		availableLanguages.value.get(selectedLanguage.value) ?? props.languages[0],
);

const isPanelVariant = computed(() => props.variant === "panel");

const closeMenu = () => {
	isOpen.value = false;
};

const toggleMenu = () => {
	isOpen.value = !isOpen.value;
};

const selectLanguage = (languageCode: string) => {
	if (!availableLanguages.value.has(languageCode)) return;

	selectedLanguage.value = languageCode;
	localStorage.setItem(props.storageKey, languageCode);
	document.documentElement.lang = languageCode;
	closeMenu();
};

const onClickOutside = (event: MouseEvent) => {
	if (!(event.target instanceof Node)) return;
	if (!root.value?.contains(event.target)) closeMenu();
};

const onWindowKeydown = (event: KeyboardEvent) => {
	if (event.key !== "Escape" || !isOpen.value) return;

	closeMenu();
	nextTick(() => trigger.value?.focus());
};

const onOptionKeydown = (event: KeyboardEvent, languageCode: string) => {
	if (event.key === "Enter" || event.key === " ") {
		event.preventDefault();
		selectLanguage(languageCode);
	}
};

onMounted(() => {
	const storedLanguage = resolveLanguageCode(localStorage.getItem(props.storageKey));
	const browserLanguage =
		navigator.languages
			.map((language) => resolveLanguageCode(language))
			.find((language): language is string => Boolean(language)) ??
		resolveLanguageCode(navigator.language);
	const initialLanguage =
		storedLanguage ?? browserLanguage ?? defaultLanguageCode.value;

	selectedLanguage.value = initialLanguage;
	document.documentElement.lang = initialLanguage;

	document.addEventListener("click", onClickOutside);
	window.addEventListener("keydown", onWindowKeydown);
});

onBeforeUnmount(() => {
	document.removeEventListener("click", onClickOutside);
	window.removeEventListener("keydown", onWindowKeydown);
});
</script>

<template>
	<div ref="root" class="language-switcher" :class="{ 'language-switcher--panel': isPanelVariant }">
		<button
			ref="trigger"
			type="button"
			class="language-switcher__trigger"
			:aria-expanded="isOpen"
			aria-haspopup="menu"
			:aria-label="isPanelVariant ? 'Seleccionar idioma' : 'Select language'"
			@click="toggleMenu"
		>
			<span class="language-switcher__trigger-content">
				<img
					v-if="currentLanguage?.flag"
					:src="currentLanguage.flag"
					alt=""
					class="language-switcher__flag"
				/>
				<span
					v-else
					class="language-switcher__fallback-icon i-lucide-languages"
					aria-hidden="true"
				/>
				<span v-if="!currentLanguage?.flag" class="language-switcher__code">
					{{ currentLanguage?.code.toUpperCase() }}
				</span>
				<span
					v-if="!isPanelVariant && currentLanguage?.flag"
					class="language-switcher__compact-code"
				>
					{{ currentLanguage?.code.toUpperCase() }}
				</span>
				<span v-if="isPanelVariant" class="language-switcher__label">
					{{ currentLanguage?.label }}
				</span>
			</span>
			<span
				v-if="isPanelVariant"
				class="language-switcher__chevron i-lucide-chevron-down"
				:class="{ 'language-switcher__chevron--open': isOpen }"
				aria-hidden="true"
			/>
		</button>

		<div
			v-show="isOpen"
			class="language-switcher__menu"
			role="menu"
		>
			<div class="language-switcher__options">
				<button
					v-for="language in languages"
					:key="language.code"
					type="button"
					class="language-switcher__option"
					:class="{ 'font-semibold': selectedLanguage === language.code }"
					role="menuitemradio"
					:aria-checked="selectedLanguage === language.code"
					@click="selectLanguage(language.code)"
					@keydown="onOptionKeydown($event, language.code)"
				>
					<span class="language-switcher__option-label">{{ language.label }}</span>
					<span
						v-if="selectedLanguage === language.code"
						aria-hidden="true"
						class="language-switcher__option-marker i-lucide-check"
					/>
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.language-switcher {
		position: relative;
		display: block;
	}

	.language-switcher__trigger {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
		padding: 0.45rem 0.65rem;
		border: 1px solid var(--color-border);
		border-radius: 1rem;
		background: rgba(255, 255, 255, 0.88);
		color: var(--color-text);
		cursor: pointer;
		transition:
			color 160ms ease,
			border-color 160ms ease,
			background-color 160ms ease,
			box-shadow 160ms ease;
	}

	.language-switcher__trigger:hover {
		border-color: rgba(99, 102, 241, 0.22);
		background: rgba(255, 255, 255, 0.96);
		box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
		color: var(--color-primary);
	}

	.language-switcher__trigger:focus-visible {
		outline: 2px solid rgba(99, 102, 241, 0.35);
		outline-offset: 3px;
	}

	.language-switcher__trigger-content {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	.language-switcher__flag {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 999px;
		object-fit: cover;
	}

	.language-switcher__code {
		line-height: 1;
		user-select: none;
	}

	.language-switcher__fallback-icon {
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
	}

	.language-switcher__compact-code {
		font-size: 0.75rem;
		font-weight: 700;
		line-height: 1;
		letter-spacing: 0.08em;
	}

	.language-switcher__menu {
		position: absolute;
		top: calc(100% + 0.5rem);
		right: 0;
		z-index: 20;
		min-width: 8.5rem;
		padding: 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: 1rem;
		background: rgba(255, 255, 255, 0.98);
		box-shadow: var(--box-shadow);
	}

	.language-switcher__options {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.language-switcher__option {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.3rem 0.1rem;
		border: none;
		background: transparent;
		cursor: pointer;
		border-radius: 0.75rem;
		text-align: left;
		font-size: 0.875rem;
		color: var(--color-text);
		transition: color 160ms ease;
	}

	.language-switcher__option:hover {
		color: var(--color-primary);
	}

	.language-switcher__option:focus-visible {
		outline: 2px solid rgba(99, 102, 241, 0.35);
		outline-offset: 3px;
	}

	.language-switcher__option-label,
	.language-switcher__option-marker {
		line-height: 1;
	}

	.language-switcher__option-marker {
		width: 0.95rem;
		height: 0.95rem;
		flex-shrink: 0;
		color: var(--color-primary);
	}

	.language-switcher--panel {
		width: 100%;
	}

	.language-switcher--panel .language-switcher__trigger {
		width: 100%;
		justify-content: space-between;
		padding: 0.875rem 1rem;
		border: 1px solid var(--color-border);
		border-radius: 1rem;
		background: rgba(255, 255, 255, 0.92);
		box-shadow: none;
	}

	.language-switcher--panel .language-switcher__label {
		font-size: 0.95rem;
		font-weight: 600;
	}

	.language-switcher__chevron {
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
		transition: transform 160ms ease;
	}

	.language-switcher__chevron--open {
		transform: rotate(180deg);
	}

	.language-switcher--panel .language-switcher__menu {
		left: 0;
		right: 0;
		min-width: 0;
	}

	.language-switcher--panel .language-switcher__option {
		padding: 0.125rem 0;
	}
</style>
