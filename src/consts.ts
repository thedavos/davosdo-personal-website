import type { NavigationItem } from '@/types'
// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "davosdo.dev";
export const SITE_DESCRIPTION =
	"Portfolio de David Vargas Domínguez, Full-Stack Software Engineer especializado en productos web, automatización e IA aplicada.";

export const SITE_NAV_ITEMS: NavigationItem[] = [
	{ url: "/", title: "Sobre mi", navigationOrder: 1 },
	{ url: "/experience", title: "Experiencia", navigationOrder: 2 },
	{ url: "/blog", title: "Blog", navigationOrder: 3 },
] as const;
