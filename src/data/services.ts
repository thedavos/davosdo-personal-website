export type Service = {
	title: string;
	slug: string;
	description: string;
	chips: string[];
	icon: string;
};

export const services: Service[] = [
	{
		title: "Web Apps",
		slug: "web-apps",
		description:
			"De la idea al producto. Construyo SaaS, dashboards y portales con arquitectura sólida, rendimiento de edge y código que dura.",
		chips: ["Vue", "React", "Angular", "JS/TS"],
		icon: "i-lucide-layout-grid",
	},
	{
		title: "Mobile Apps",
		slug: "mobile-apps",
		description:
			"Tu app en iOS y Android sin doblar el presupuesto. Experiencias nativas con Flutter, lista para escalar desde el día uno.",
		chips: ["React Native", "Flutter"],
		icon: "i-lucide-smartphone",
	},
	{
		title: "Ecommerce",
		slug: "ecommerce",
		description:
			"Tiendas que convierten. Diseño, catálogo, checkout y pasarela de pagos optimizados para que vendas más con menos fricción.",
		chips: ["Shopify", "Astro", "CMS"],
		icon: "i-lucide-shopping-bag",
	},
	{
		title: "Automation Bots",
		slug: "automation-bots",
		description:
			"Elimina el trabajo repetitivo. Bots y pipelines que rastrean, notifican y atienden clientes mientras tú duermes.",
		chips: ["n8n", "Python"],
		icon: "i-lucide-bot",
	},
	{
		title: "CLI",
		slug: "cli",
		description:
			"Herramientas que entienden tu flujo. Scripts y CLIs a medida para que tu equipo técnico trabaje el doble de rápido.",
		chips: ["Node.js", "Typescript", "Golang"],
		icon: "i-lucide-terminal",
	},
	{
		title: "AI Apps",
		slug: "ai-apps",
		description:
			"IA que resuelve problemas reales. Asistentes, búsqueda semántica y agentes entrenados sobre tu negocio, no sobre demos genéricas.",
		chips: ["OpenAI", "Vercel AI SDK", "Kapso.ai"],
		icon: "i-lucide-sparkles",
	},
];

export function getServiceBySlug(slug: string): Service | undefined {
	return services.find((service) => service.slug === slug);
}
