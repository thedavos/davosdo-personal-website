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

interface Props {
	languages?: LanguageOption[];
	defaultLanguage?: string;
	storageKey?: string;
}

const props = withDefaults(defineProps<Props>(), {
	languages: () => [
		{ code: "en", label: "Inglés", flag: EnFlag },
		{ code: "es", label: "Español", flag: EsFlag },
		{ code: 'pt', label: 'Portugués', flag: PtFlag }
	],
	defaultLanguage: "es",
	storageKey: "preferred-language",
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

const onTriggerKeydown = (event: KeyboardEvent) => {
	if (event.key === "Enter" || event.key === " ") {
		event.preventDefault();
		toggleMenu();
	}
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
	<div ref="root" class="relative block">
		<div
			ref="trigger"
			class="flex cursor-pointer items-center justify-center gap-1 rounded-2xl bg-surface text-sm text-body transition-colors"
			role="button"
			tabindex="0"
			:aria-expanded="isOpen"
			aria-haspopup="menu"
			aria-label="Select language"
			@click="toggleMenu"
			@keydown="onTriggerKeydown"
		>
			<img
				v-if="currentLanguage?.flag"
				:src="currentLanguage.flag"
				alt=""
				class="h-6 w-6 rounded-full object-cover"
			/>
			<span v-else class="leading-none select-none">
				{{ currentLanguage?.code.toUpperCase() }}
			</span>
		</div>

		<div
			v-show="isOpen"
			class="absolute right-0 top-[calc(100%+0.5rem)] z-20 min-w-25 rounded-2xl border border-outline bg-surface p-3 shadow-md"
			role="menu"
		>
			<div class="flex flex-col gap-3">
				<div
					v-for="language in languages"
					:key="language.code"
					class="flex cursor-pointer justify-between rounded-xl text-left text-sm text-body transition-colors"
					:class="{ 'font-semibold': selectedLanguage === language.code }"
					role="menuitemradio"
					tabindex="0"
					:aria-checked="selectedLanguage === language.code"
					@click="selectLanguage(language.code)"
					@keydown="onOptionKeydown($event, language.code)"
				>
					<span class="leading-none">{{ language.label }}</span>
					<span
						v-if="selectedLanguage === language.code"
						aria-hidden="true"
						class="leading-none text-primary"
					>
						●
					</span>
				</div>
			</div>
		</div>
	</div>
</template>
