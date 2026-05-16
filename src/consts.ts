import type { NavItem, NavigationItem } from '@/types'
// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "davosdo.dev";
export const SITE_DESCRIPTION = "Welcome to my website!";

export const SITE_NAV_ITEMS: NavigationItem[] = [
	{ url: "/", title: "Sobre mi" },
	{ url: "/services", title: "Servicios" },
	{ url: "/experience", title: "Experiencia" },
	{ url: "/projects", title: "Proyectos" },
	{ url: "/blog", title: "Blog" },
	{ url: "/contact", title: "Contacto" },
] as const;
