export type Theme = "light" | "dark";

const THEME_KEY = "theme";
const systemPreference = () =>
	window.matchMedia("(prefers-color-scheme: dark)");

function explicitTheme(): Theme | null {
	const stored = localStorage.getItem(THEME_KEY);
	return stored === "light" || stored === "dark" ? stored : null;
}

function systemTheme(): Theme {
	return systemPreference().matches ? "dark" : "light";
}

/** Saved choice, or the operating system's color scheme when there is none. */
export function resolveTheme(): Theme {
	return explicitTheme() ?? systemTheme();
}

function paintTheme(theme: Theme) {
	const root = document.documentElement;
	root.setAttribute("data-theme", theme);
	root.classList.toggle("dark", theme === "dark");
	root.style.colorScheme = theme;
}

export function setTheme(theme: Theme) {
	const root = document.documentElement;
	root.classList.add("theme-transition");
	window.setTimeout(() => root.classList.remove("theme-transition"), 300);

	paintTheme(theme);
	localStorage.setItem(THEME_KEY, theme);
}

export function toggleTheme() {
	const current = document.documentElement.getAttribute("data-theme");
	setTheme(current === "dark" ? "light" : "dark");
}

/** Keeps the page on the system scheme until the visitor picks one. */
export function followSystemTheme() {
	const media = systemPreference();
	const apply = () => {
		if (explicitTheme()) return;
		paintTheme(systemTheme());
	};

	apply();
	media.addEventListener("change", apply);
}
