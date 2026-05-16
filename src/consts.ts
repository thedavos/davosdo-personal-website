import type { NavigationItem } from '@/types'
// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "davosdo.dev";
export const SITE_DESCRIPTION = "Welcome to my website!";

export const SITE_NAV_ITEMS: NavigationItem[] = [
	{ url: "/", title: "Sobre mi", navigationOrder: 1 },
	{ url: "/services", title: "Servicios", navigationOrder: 2 },
	{ url: "/experience", title: "Experiencia", navigationOrder: 3 },
	{ url: "/projects", title: "Proyectos", navigationOrder: 4 },
	{ url: "/blog", title: "Blog", navigationOrder: 5 },
	{ url: "/contact", title: "Contacto", navigationOrder: 6 },
] as const;
