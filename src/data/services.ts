export type ServiceUseCase = {
	quote: string;
	outcome?: string;
};

export type Service = {
	title: string;
	slug: string;
	description: string;
	chips: string[];
	useCases: ServiceUseCase[];
};

export const services: Service[] = [
	{
		title: "Web Apps",
		slug: "web-apps",
		description:
			"De la idea al producto. Construyo SaaS, dashboards y portales con arquitectura sólida, rendimiento de edge y código que dura.",
		chips: ["Vue", "React", "Angular", "JS/TS"],
		useCases: [
			{
				quote:
					"Nuestra operativa es un collage de Excels, emails y grupos de WhatsApp. El caos nos hace perder ventas y, lo peor, la confianza de nuestros clientes.",
				outcome:
					"Centralizaré pedidos, estados y seguimiento en una web app con Vue o React, con visibilidad en tiempo real para todo tu equipo.",
			},
			{
				quote:
					"El equipo pasa el 40% del día registrando usuarios y explicando procesos básicos. El onboarding manual se ha vuelto el cuello de botella que frena nuestro crecimiento.",
				outcome:
					"Automatizaré registro y onboarding en un portal JS/TS, para que tus clientes se activen solos mientras tu equipo escala.",
			},
			{
				quote:
					"Tomar una decisión nos toma horas porque los datos viven en islas separadas. Estamos operando a ciegas sin una fuente única de la verdad.",
				outcome:
					"Construiré un dashboard en React o Angular que consolide tus fuentes en KPIs claros para decidir sin operar a ciegas.",
			},
		],
	},
	{
		title: "Mobile Apps",
		slug: "mobile-apps",
		description:
			"Tu app en iOS y Android sin doblar el presupuesto. Experiencias nativas con Flutter, lista para escalar desde el día uno.",
		chips: ["React Native", "Flutter"],
		useCases: [
			{
				quote:
					"Mis clientes dependen de mi WhatsApp para todo: agendar, pagar o consultar dudas. Me he convertido en un call center 24/7 y no puedo desconectarme del negocio.",
				outcome:
					"Crearé una app en Flutter o React Native para que tus clientes agenden, paguen y consulten sin depender de tu WhatsApp.",
			},
			{
				quote:
					"Nuestros vendedores en campo pierden ventas porque no pueden consultar stock en tiempo real o la conexión falla. El proceso en papel es lento y propenso a errores.",
				outcome:
					"Desarrollaré una herramienta móvil con Flutter, modo offline y sincronización para cerrar ventas con o sin señal.",
			},
			{
				quote:
					"Invertimos mucho en atraer usuarios pero se olvidan de nosotros a la semana. Los emails ya nadie los abre y estamos perdiendo el contacto directo con nuestra audiencia.",
				outcome:
					"Lanzaré una app con React Native y notificaciones push para mantener un canal directo y mejorar la retención.",
			},
		],
	},
	{
		title: "Ecommerce",
		slug: "ecommerce",
		description:
			"Tiendas que convierten. Diseño, catálogo, checkout y pasarela de pagos optimizados para que vendas más con menos fricción.",
		chips: ["Shopify", "Astro", "CMS"],
		useCases: [
			{
				quote:
					"Tengo una comunidad sólida en redes, pero dependo de algoritmos ajenos y comisiones abusivas que devoran mi margen. Necesito un hogar para mi marca.",
				outcome:
					"Montaré tu tienda en Shopify o Astro, optimizada para conversión y con datos de clientes bajo tu control.",
			},
			{
				quote:
					"Mi web se siente pesada y obsoleta. Los clientes se van antes de que carguen las fotos y siento que cada segundo de carga es dinero que se escapa por la ventana.",
				outcome:
					"Reconstruiré la experiencia con Astro y un CMS ligero para lograr Core Web Vitals en verde y menos fricción de compra.",
			},
			{
				quote:
					"Vender por varios canales es una pesadilla logística. Siempre terminamos pidiendo disculpas por falta de stock porque la web no se enteró de lo que vendimos en la tienda física.",
				outcome:
					"Integraré Shopify, CMS e inventario omnicanal para sincronizar stock en tiempo real y evitar ventas imposibles.",
			},
		],
	},
	{
		title: "Automation Bots",
		slug: "automation-bots",
		description:
			"Elimina el trabajo repetitivo. Bots y pipelines que rastrean, notifican y atienden clientes mientras tú duermes.",
		chips: ["n8n", "Python"],
		useCases: [
			{
				quote:
					"Recibimos prospectos 24/7, pero si no respondemos en los primeros 5 minutos, se van con la competencia. Mi equipo no puede estar despierto toda la noche.",
				outcome:
					"Orquestaré n8n y Python para responder, calificar leads y avisar a ventas antes de que el negocio se enfríe.",
			},
			{
				quote:
					"El traspaso de información entre marketing y ventas es manual y lento. Los datos se pierden en el camino y el seguimiento se vuelve inconsistente.",
				outcome:
					"Conectaré anuncios, CRM y equipo con workflows en n8n para mover datos limpios sin copiar y pegar.",
			},
			{
				quote:
					"Enterramos a personal talentoso en tareas mecánicas como transcribir facturas y reportes. Es un desperdicio de potencial y una fuente constante de errores humanos.",
				outcome:
					"Automatizaré extracción y carga de documentos con Python para reducir errores y liberar a tu equipo de trabajo mecánico.",
			},
		],
	},
	{
		title: "CLI",
		slug: "cli",
		description:
			"Herramientas que entienden tu flujo. Scripts y CLIs a medida para que tu equipo técnico trabaje el doble de rápido.",
		chips: ["Node.js", "Typescript", "Golang"],
		useCases: [
			{
				quote:
					"Cada nuevo desarrollador tarda días en tener su entorno listo por inconsistencias entre sistemas operativos y versiones. Es tiempo productivo tirado a la basura.",
				outcome:
					"Construiré una CLI en Node.js o TypeScript que estandarice el setup y deje al equipo escribiendo código el primer día.",
			},
			{
				quote:
					"Nuestros procesos de despliegue y testing son manuales y dependen de la memoria de cada dev. Un olvido pequeño puede causar una caída crítica del sistema.",
				outcome:
					"Encapsularé deploys y tests en comandos de Node.js o Go, con flujos repetibles y menos espacio para errores.",
			},
			{
				quote:
					"Las migraciones de datos nos quitan el sueño. Es un proceso manual, lento y con un riesgo altísimo de pérdida de información si algo falla a mitad de camino.",
				outcome:
					"Desarrollaré CLIs en Go o TypeScript con validaciones, dry-runs y recuperación para migraciones más seguras.",
			},
		],
	},
	{
		title: "AI Apps",
		slug: "ai-apps",
		description:
			"IA que resuelve problemas reales. Asistentes, búsqueda semántica y agentes entrenados sobre tu negocio, no sobre demos genéricas.",
		chips: ["OpenAI", "Vercel AI SDK", "Kapso.ai"],
		useCases: [
			{
				quote:
					"Tenemos una montaña de información interna, pero nadie sabe dónde encontrar nada. Perdemos horas buscando respuestas que ya están escritas en algún documento perdido.",
				outcome:
					"Crearé búsqueda semántica con OpenAI para consultar tu documentación con respuestas precisas y fuentes verificables.",
			},
			{
				quote:
					"El 80% de nuestras consultas de soporte son repetitivas. Mi equipo está saturado resolviendo lo básico y no puede atender los casos complejos que realmente importan.",
				outcome:
					"Implementaré un asistente con Vercel AI SDK u OpenAI, entrenado en tu negocio para resolver dudas comunes al instante.",
			},
			{
				quote:
					"Tenemos miles de feedbacks de clientes pero no el tiempo para procesarlos. Siento que tenemos la clave para mejorar el producto enterrada bajo una montaña de texto.",
				outcome:
					"Procesaré feedback con OpenAI y Kapso.ai para convertir miles de opiniones en insights accionables a escala.",
			},
		],
	},
];

export function getServiceBySlug(slug: string): Service | undefined {
	return services.find((service) => service.slug === slug);
}
