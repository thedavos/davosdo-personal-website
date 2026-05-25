export type ProjectImportance = "high" | "medium" | "low";
export type ProjectStatus = "production" | "beta" | "development" | "concept";

export type ProjectLink = {
	label: string;
	url: string;
	icon?: string;
	live?: boolean;
};

export type StackCategory = {
	category: string;
	items: string[];
};

export type ProjectSummary = {
	title: string;
	slug: string;
	description: string;
	tags: string[];
	show: boolean;
	importance: ProjectImportance;
	colSpan?: 1 | 2;
};

export type ProjectDetail = ProjectSummary & {
	status: ProjectStatus;
	longDescription: string;
	role: string;
	year: string;
	features: string[];
	stack: StackCategory[];
	links: ProjectLink[];
	images: {
		hero: string;
		gallery: string[];
	};
};

/**
 * Display order is intentional:
 * – High cards go first (their 2×2 size already dominates visually).
 * – Medium and low cards are interleaved to break the rigid
 *   "block-of-mediums → block-of-lows" pattern and create
 *   a more organic masonry feel.
 */
export const projects: ProjectDetail[] = [
{

		title: "Interbank",
		slug: "interbank",
		description:
			"Software Engineer en flujos críticos de banca digital: microfrontend Cambio Moneda, plataforma BPI, Adobe Analytics, hardening de seguridad y remediación de CVEs.",
		tags: ["TypeScript", "Vue", "Angular", "CSS", "APIs", "Analytics"],
		show: true,
		importance: "high",
		status: "production",
		longDescription:
			"En Interbank desarrollo y mantengo experiencias de banca digital de alto impacto: el flujo de Cambio Moneda en la app móvil, implementado como microfrontend en WebView, y la plataforma BPI en web. Mi trabajo abarca desde la entrega de funcionalidades y ajustes de UX hasta la estabilización de bugs, e incluye instrumentación con Adobe Analytics, refuerzo de seguridad del canal y cierre de brechas CVE en los repositorios bajo mi responsabilidad. Todo el ciclo se apoya en documentación técnica en Confluence, observabilidad con Dynatrace y gestión ágil del trabajo en JIRA.",
		role: "Software Engineer",
		year: "Agosto 2025 – presente",
		features: [
			"Desarrollo de features, correcciones visuales y bugs en Cambio Moneda, microfrontend embebido como webview en la app móvil",
			"Implementación de Adobe Analytics en el flujo de Cambio Moneda",
			"Mejoras de seguridad (rate limit, secuencialidad de servicios) y ajustes visuales en Banca Por Internet (BPI)",
			"Remediación de vulnerabilidades CVE en repositorios de Cambio Moneda (MFE) y BPI, llevando Critical y High a 0%",
			"Documentación de features en Confluence para Cambio Moneda y BPI",
			"Creación y mantenimiento de dashboards de observabilidad con Dynatrace",
			"Trabajo en metodologías ágiles con historias de usuario en JIRA",
		],
		stack: [
			{ category: "Frontend", items: ["Vue 2", "Angular", "TypeScript", "Microfrontends", "SCSS", "CSS", "JavaScript", "Adobe Analytics"] },
			{ category: "Herramientas", items: ["Vite", "Webpack", "Jasmine", "Jest", "Playwright"] },
			{ category: "Backend / APIs", items: ["REST APIs", "Node.js"] },
			{ category: "Infraestructura", items: ["Azure Pipelines", "GitHub Actions"] },
			{ category: "AI", items: ["GitHub Copilot", "ChatGPT 5.4", "Claude Opus 4.6", "AI Skills", "MCP servers"] },
		],
		links: [
			{ label: "Interbank Web App", url: "https://interbank.pe", icon: "i-lucide-rocket", live: true },
			{ label: "Interbank App", url: "https://play.google.com/store/apps/details?id=pe.com.interbank.mobilebanking", icon: "i-simple-icons-android" },
			{ label: "Interbank App", url: "https://apps.apple.com/us/app/interbank-app/id378649517", icon: "i-simple-icons-apple" },
		],
		images: {
			hero: "/projects/interbank/ibk_cambio_moneda_inicio.webp",
			gallery: [
				"/projects/interbank/ibk_bpi_inicio.webp",
				"/projects/interbank/ibk_cambio_moneda_flujo.webp",
				"/projects/interbank/ibk_bpi_login.webp",
			],
		},
	},
{
		title: "Global66",
		slug: "global66",
		description:
			"Sr. Frontend Developer en la app fintech Global66: wallet multimoneda, envíos internacionales, cotizadores, regulaciones por país e integraciones ACH Colombia y CCA en mobile.",
		tags: ["TypeScript", "Vue", "NativeScript", "Tailwind", "APIs"],
		show: true,
		importance: "high",
		status: "production",
		longDescription:
			"De mayo de 2021 a mayo de 2025 fui Sr. Frontend Developer en Global66, fintech especializada en transferencias internacionales y cuentas globales multimoneda. Participé en el primer lanzamiento de la app móvil con NativeScript y, posteriormente, contribuí a la evolución de productos clave en Flutter y Vue: wallet en CLP, PEN, ARS, COP y USD, recargas vía ACH Colombia y CCA Chile, cotizadores de conversión, envíos P2P, creación de beneficiarios, movimientos y cuentas. En módulos de alta complejidad apliqué principios SOLID y Clean Architecture para escalar regulaciones y límites monetarios de Colombia y Perú, reduciendo incidentes en flujos críticos. También documenté cada entrega y presenté las features al equipo para alinear producto, operación y desarrollo.",
		role: "Sr. Frontend Developer",
		year: "Mayo 2021 – Mayo 2025",
		features: [
			"Participación en el primer lanzamiento de la app móvil de Global66 con NativeScript",
			"Wallet multimoneda con carga, envíos y conversiones en CLP, PEN, ARS, COP y USD, llevado a producción",
			"Regulaciones y límites monetarios de Colombia y Perú con principios SOLID escalables para incorporar nuevos países",
			"Integración ACH Colombia y CCA (Chile) en la app móvil para facilitar recargas, ajustar límites monetarios y mejorar el SLA de envíos",
			"Rediseño visual y de lógica del módulo de movimientos siguiendo principios SOLID para incorporar nuevos tipos de transacción con menor fricción",
			"Rediseño de la capa de cuentas en frontend (nuevas cuentas, límites, banners y número de cuenta) con principios SOLID, desplegado exitosamente a producción",
			"Cotizador de conversiones implementado desde cero; rediseño del cotizador de transferencias y envíos P2P con reducción significativa de incidentes",
			"Features y correcciones en el módulo de creación de beneficiarios, con reducción importante de incidentes operativos",
			"Migración de mixins de Vue 2 a composables de Vue 3 para modernizar la base de código y mejorar su reutilización",
			"Migración de lógica de negocio dispersa hacia Clean Architecture para centralizar reglas y facilitar el mantenimiento",
			"Participación en la migración de JavaScript con Vue y NativeScript a Flutter, con formación en Dart y Flutter en Global66 Tech",
			"Documentación de features y correcciones, con presentaciones al equipo por cada entrega",
		],
		stack: [
			{ category: "Frontend", items: ["Vue 2", "Vue 3", "TypeScript", "Tailwind CSS", "CSS", "JavaScript"] },
			{ category: "Mobile", items: ["Flutter", "NativeScript"] },
			{ category: "Herramientas", items: ["Vite", "Webpack", "Jest"] },
			{ category: "Backend / APIs", items: ["REST APIs"] },
			{ category: "Infraestructura", items: ["AWS"] },
			{ category: "AI", items: ["ChatGPT"] },
		],
		links: [
			{ label: "Global66 App", url: "https://play.google.com/store/apps/details?id=com.global66.cards", icon: "i-simple-icons-android" },
			{ label: "Global66 App", url: "https://apps.apple.com/us/app/global66-tu-cuenta-global/id1494957339", icon: "i-simple-icons-apple" },
		],
		images: {
			hero: "/projects/global66/g66_home.webp",
			gallery: [
				"/projects/global66/g66_send_landing.webp",
				"/projects/global66/g66_send_view.webp",
				"/projects/global66/g66_create_beneficiary_form.webp",
				"/projects/global66/g66_beneficiary_list_view.webp",
				"/projects/global66/g66_quote_costs_bottomsheet.webp",
				"/projects/global66/g66_accounts_view.webp",
				"/projects/global66/g66_accounts_usd.webp",
				"/projects/global66/g66_charge_usd_landing.webp",
				"/projects/global66/g66_charge_view.webp",
				"/projects/global66/g66_charge_methods.webp",
				"/projects/global66/g66_exchange_view.webp",
				"/projects/global66/g66_movements_view.webp",
				"/projects/global66/g66_movements_filters.webp",
			],
		},
	},
	{
		title: "2post",
		slug: "2post",
		description:
			"Scheduler con AI para convertir una idea en contenido listo para LinkedIn, X y Bluesky, con edición, calendario y publicación.",
		tags: ["TypeScript", "AI", "Scheduling", "Social APIs"],
		show: true,
		importance: "medium",
		status: "development",
		longDescription:
			"2post.app es una herramienta pensada para developers, founders y emprendedores que quieren pasar de una idea a contenido publicado sin perder tiempo adaptando manualmente cada post. Su núcleo está bien definido: idea → adaptación por red → edición → programación → publicación. La apuesta no es competir por volumen de features, sino por simplicidad, utilidad real y una capa de AI enfocada en adaptar el mensaje sin inventar logros ni resultados.",
		role: "Fullstack Developer & Creator",
		year: "2024 – presente",
		features: [
			"Generación de variantes por red para LinkedIn, X y Bluesky",
			"Edición manual antes de publicar",
			"Scheduling y calendario básico",
			"Historial y estado de publicaciones",
			"Publicación automática",
			"AI enfocada en adaptar contenido, no en inventar logros o métricas",
		],
		stack: [
			{ category: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS"] },
			{ category: "Backend", items: ["NestJS", "Node.js"] },
			{ category: "AI", items: ["OpenAI", "Vercel AI SDK"] },
			{ category: "Integraciones", items: ["LinkedIn API", "X API", "Bluesky API"] },
		],
		links: [
			{ label: "Repositorio", url: "https://github.com/davosdo/2post", icon: "i-lucide-github" },
			{ label: "Demo", url: "#", icon: "i-lucide-play", live: true },
		],
		images: {
			hero: "https://placehold.co/1200x600/1a1a2e/6366f1?text=2post+Hero",
			gallery: [
				"https://placehold.co/800x500/1a1a2e/6366f1?text=AI+Editor",
				"https://placehold.co/800x500/1a1a2e/6366f1?text=Calendario",
			],
		},
	},
	{
		title: "Asynmail",
		slug: "asynmail",
		description:
			"SaaS multi-dominio para centralizar inbox, threading y respuestas siempre desde la identidad correcta.",
		tags: ["Cloudflare", "Email", "D1", "R2"],
		show: true,
		importance: "low",
		status: "concept",
		longDescription:
			"Asynmail está pensado para equipos o makers que operan varios dominios y aliases desde un solo lugar sin arriesgar respuestas enviadas desde la identidad equivocada. La propuesta combina un inbox centralizado con threading y reply orchestration, apoyándose en Cloudflare para el flujo de recepción, envío y procesamiento edge. El valor no está en agregar otra bandeja de entrada más, sino en hacer confiable la gestión de múltiples identidades de correo.",
		role: "Fullstack Developer & Creator",
		year: "2024 – presente",
		features: [
			"Inbox multi-dominio centralizado",
			"Aliases explícitos",
			"Threading de conversaciones",
			"Reply orchestration con identidad de salida correcta",
			"Logs operativos",
			"Adjuntos básicos",
		],
		stack: [
			{ category: "Edge / Backend", items: ["Cloudflare Workers", "Cloudflare Email Service", "Cloudflare Email Routing"] },
			{ category: "Datos", items: ["Cloudflare D1", "Cloudflare R2"] },
			{ category: "Procesamiento", items: ["Cloudflare Queues"] },
			{ category: "Frontend", items: ["Astro", "Workers Assets", "Flutter"] },
		],
		links: [
			{ label: "Repositorio", url: "https://github.com/davosdo/asynmail", icon: "i-lucide-github" },
		],
		images: {
			hero: "https://placehold.co/1200x600/1a1a2e/6366f1?text=Asynmail+Hero",
			gallery: [
				"https://placehold.co/800x500/1a1a2e/6366f1?text=Inbox",
				"https://placehold.co/800x500/1a1a2e/6366f1?text=Compose",
			],
		},
	},
	{
		title: "davosdo.link",
		slug: "davosdo-link",
		description:
			"Workspace personal para links cortos con analytics y snippets privados reutilizables, construido mientras aprendo Go.",
		tags: ["Go", "Short Links", "Snippets", "Learning"],
		show: true,
		importance: "low",
		status: "development",
		longDescription:
			"davosdo.link une dos herramientas de trabajo en un solo espacio: links cortos con analytics básicos y snippets privados para comandos, prompts, configs y notas reutilizables. El proyecto está planteado también como una vía práctica para aprender Go, así que prioriza una arquitectura simple, incremental y fácil de mantener antes que una solución sobrediseñada.",
		role: "Fullstack Developer",
		year: "2024 – presente",
		features: [
			"Links cortos personalizados",
			"Analytics básicos de clics",
			"Snippets privados reutilizables",
			"Organización por proyecto o cliente",
			"Metadatos y ownership compartidos entre links y snippets",
		],
		stack: [
			{ category: "Backend", items: ["Go"] },
			{ category: "Arquitectura", items: ["Monolito web simple", "Panel autenticado", "Rutas públicas para redirects"] },
			{ category: "Datos", items: ["Base de datos relacional"] },
		],
		links: [
			{ label: "davosdo.link", url: "https://davosdo.link", icon: "i-lucide-rocket", live: true },
			{ label: "Repositorio", url: "https://github.com/davosdo/davosdo-link", icon: "i-lucide-github" },
		],
		images: {
			hero: "https://placehold.co/1200x600/1a1a2e/6366f1?text=davosdo.link+Hero",
			gallery: [
				"https://placehold.co/800x500/1a1a2e/6366f1?text=Dashboard",
				"https://placehold.co/800x500/1a1a2e/6366f1?text=Analytics",
			],
		},
	},
	{
		title: "Misgastos.app",
		slug: "misgastos-app",
		description:
			"Asistente de gastos por WhatsApp para registrar movimientos con lenguaje natural y validar hábito antes de evolucionar hacia LukaApp.",
		tags: ["WhatsApp", "Cloudflare", "Workers AI", "D1"],
		show: true,
		importance: "medium",
		status: "beta",
		longDescription:
			"Misgastos.app es un asistente conversacional para control de gastos personales cuyo objetivo inicial es validar un hábito: que registrar gastos por WhatsApp sea realmente más fácil que usar una app financiera tradicional. El MVP se enfoca en captura por lenguaje natural, confirmación inmediata, corrección simple y resúmenes bajo demanda, con una arquitectura basada en Kapso.ai y Cloudflare para mantener la operación liviana y directa dentro del mismo canal.",
		role: "Fullstack Developer & Creator",
		year: "2024 – presente",
		features: [
			"Registro de gastos por texto libre en WhatsApp",
			"Confirmación inmediata",
			"Corrección simple del último gasto",
			"Resúmenes bajo demanda",
			"Categorización automática básica",
			"Onboarding conversacional mínimo",
		],
		stack: [
			{ category: "Canal", items: ["WhatsApp", "Kapso.ai"] },
			{ category: "Backend", items: ["Cloudflare Workers", "Cloudflare Workflows", "Cloudflare Queues", "Cloudflare Cron Triggers"] },
			{ category: "AI", items: ["Cloudflare Workers AI"] },
			{ category: "Datos", items: ["Cloudflare D1", "Cloudflare R2"] },
		],
		links: [
			{ label: "misgastos.app", url: "https://misgastos.app", icon: "i-lucide-rocket", live: true },
		],
		images: {
			hero: "https://placehold.co/1200x600/1a1a2e/6366f1?text=Misgastos+Hero",
			gallery: [
				"https://placehold.co/800x500/1a1a2e/6366f1?text=WhatsApp+Chat",
				"https://placehold.co/800x500/1a1a2e/6366f1?text=Dashboard",
			],
		},
	},
	{
		title: "Digimon Auto Chess",
		slug: "digimon-auto-chess",
		description:
			"Auto battler web-first y server-authoritative sobre Cloudflare, con Match Durable Objects para partidas y D1 para metajuego.",
		tags: ["TypeScript", "Cloudflare", "Durable Objects", "D1"],
		show: true,
		importance: "low",
		colSpan: 2,
		status: "concept",
		longDescription:
			"Proyecto de auto battler web-first inspirado en Digimon, donde cada partida vive como una simulación server-authoritative dentro de un Match Durable Object. Esa decisión separa claramente el combate en tiempo real del metajuego persistente en D1. La ambición del proyecto está en construir un core loop jugable sólido antes de expandirse a más contenido o complejidad sistémica.",
		role: "Game Developer & Creator",
		year: "2025 – presente",
		features: [
			"Partidas en tiempo real con Match Durable Objects",
			"Draft y composición de equipos",
			"Combate automático server-authoritative",
			"Flow de matchmaking",
			"Cliente web con UI realtime de partida",
			"Persistencia de metagame en D1",
		],
		stack: [
			{ category: "Frontend", items: ["TypeScript", "Web Client", "WebSockets"] },
			{ category: "Backend", items: ["Cloudflare Workers", "Durable Objects"] },
			{ category: "Datos", items: ["Cloudflare D1"] },
			{ category: "Arquitectura", items: ["Server-authoritative", "Realtime state machine"] },
		],
		links: [
			{ label: "Repositorio", url: "https://github.com/davosdo/digimon-auto-chess", icon: "i-lucide-github" },
		],
		images: {
			hero: "https://placehold.co/1200x600/1a1a2e/6366f1?text=Digimon+Auto+Chess",
			gallery: [
				"https://placehold.co/800x500/1a1a2e/6366f1?text=Board",
				"https://placehold.co/800x500/1a1a2e/6366f1?text=Draft+Phase",
			],
		},
	},
	{
		title: "Davosdo portfolio web",
		slug: "davosdo-portfolio-web",
		description:
			"Sitio personal para davosdo.dev con Astro, contenido real, branding propio, SEO técnico y despliegue en Cloudflare.",
		tags: ["Astro", "SEO", "RSS", "Cloudflare"],
		show: true,
		importance: "low",
		status: "concept",
		longDescription:
			"Proyecto orientado a lanzar davosdo.dev como una web personal más cuidada y útil: branding propio, contenido real sobre proyectos y experiencia, base técnica en Astro y una capa sólida de SEO, sitemap y RSS. Aún no tiene descomposición operativa cerrada en documentos o issues, así que hoy funciona más como dirección de producto y presencia personal que como build totalmente especificado.",
		role: "Designer & Developer",
		year: "2024 – presente",
		features: [
			"Branding real para la web personal",
			"Contenido real de proyectos y experiencia",
			"SEO técnico",
			"Sitemap",
			"RSS",
			"Despliegue en Cloudflare",
		],
		stack: [
			{ category: "Frontend", items: ["Astro", "TypeScript"] },
			{ category: "Contenido", items: ["Markdown", "RSS", "Sitemap"] },
			{ category: "Infraestructura", items: ["Cloudflare"] },
		],
		links: [
			{ label: "davosdo.dev", url: "https://davosdo.dev", icon: "i-lucide-rocket", live: true },
			{ label: "Repositorio", url: "https://github.com/davosdo/davosdo-personal-website", icon: "i-lucide-github" },
		],
		images: {
			hero: "https://placehold.co/1200x600/1a1a2e/6366f1?text=davosdo.dev+Hero",
			gallery: [
				"https://placehold.co/800x500/1a1a2e/6366f1?text=Homepage",
				"https://placehold.co/800x500/1a1a2e/6366f1?text=Projects",
			],
		},
	},
	{
		title: "Compathium",
		slug: "compathium",
		description:
			"Plataforma conversacional multi-tenant y multicanal para lanzar verticales sin reconstruir la infraestructura base.",
		tags: ["Cloudflare", "Multi-tenant", "Messaging", "Automation"],
		show: true,
		importance: "medium",
		status: "development",
		longDescription:
			"Compathium es la capa fundacional para construir verticales conversacionales de otras apps sobre una misma base técnica. Centraliza mensajería, automatización, operación, configuración, observabilidad y modelo de datos con una arquitectura event-driven y agnóstica al canal. La meta es que cada nuevo vertical reutilice el core en lugar de empezar de cero.",
		role: "Backend Architect & Developer",
		year: "2024 - presente",
		features: [
			"Arquitectura multi-tenant con aislamiento por tenant",
			"Core de mensajería y conversación multicanal",
			"Automations y jobs",
			"Admin y ops console",
			"Seguridad, auditoría y observabilidad",
			"Base reutilizable para verticales conversacionales",
		],
		stack: [
			{ category: "Platform", items: ["Cloudflare", "Event-driven architecture"] },
			{ category: "Backend", items: ["TypeScript", "Channel adapters", "Jobs engine"] },
			{ category: "Datos", items: ["D1", "Core data model", "Audit logs"] },
		],
		links: [
			{ label: "Repositorio", url: "https://github.com/davosdo/compathium", icon: "i-lucide-github" },
		],
		images: {
			hero: "https://placehold.co/1200x600/1a1a2e/6366f1?text=Compathium+Hero",
			gallery: [
				"https://placehold.co/800x500/1a1a2e/6366f1?text=Architecture",
				"https://placehold.co/800x500/1a1a2e/6366f1?text=Dashboard",
			],
		},
	},
	{
		title: "GolazoKings",
		slug: "golazokings",
		description:
			"Producto web para fans de Kings League con hub SEO, lineup builder y capa de comunidad, sobre TanStack Start + Supabase.",
		tags: ["TanStack Start", "Supabase", "SEO", "Community"],
		show: true,
		importance: "low",
		status: "development",
		longDescription:
			"GolazoKings es una experiencia web fan-focused construida sobre tres piezas conectadas: un hub público orientado a SEO con fixtures, resultados y standings; un lineup builder para crear, publicar y compartir alineaciones; y una capa mínima de comunidad con comentarios, reacciones y reportes. Ya no es solo una idea: cuenta con documentación end-to-end, base SQL y RLS, contratos de server functions, scaffold real de app y backlog operativo en Linear.",
		role: "Fullstack Developer & Creator",
		year: "2025 – presente",
		features: [
			"Hub SEO SSR con fixtures, resultados y standings",
			"Lineup builder con publish flow",
			"Comentarios, reacciones y reportes con moderación básica",
			"Admin manual obligatorio para operar el MVP",
			"RLS como base del modelo de seguridad",
			"OG generation server-side para lineups publicadas",
		],
		stack: [
			{ category: "Frontend", items: ["TanStack Start", "TypeScript", "React", "SSR"] },
			{ category: "Backend / Data", items: ["Supabase", "Postgres", "RLS", "Storage"] },
			{ category: "Server Logic", items: ["createServerFn", "OG generation", "Privileged operations"] },
		],
		links: [
			{ label: "Repositorio", url: "https://github.com/davosdo/golazokings", icon: "i-lucide-github" },
		],
		images: {
			hero: "https://placehold.co/1200x600/1a1a2e/6366f1?text=GolazoKings+Hero",
			gallery: [
				"https://placehold.co/800x500/1a1a2e/6366f1?text=Lineup+Builder",
				"https://placehold.co/800x500/1a1a2e/6366f1?text=Stats",
			],
		},
	},
	{
		title: "Questd",
		slug: "questd",
		description:
			"CLI developer-first para gamificación programable sobre Habitica, con foco en un núcleo operativo claro desde terminal.",
		tags: ["TypeScript", "Node.js", "CLI", "Habitica"],
		show: true,
		importance: "low",
		status: "concept",
		longDescription:
			"Questd es una herramienta CLI pensada para developers que quieren operar una capa de gamificación personal sobre Habitica sin depender de interfaces pesadas ni tocar archivos internos. El MVP está recortado a un núcleo operativo concreto: inicialización, autenticación, sincronización, estado, registro de eventos y reset con safety guards. La idea es que la experiencia sea scriptable, limpia y realmente usable desde terminal.",
		role: "Developer & Creator",
		year: "2025 – presente",
		features: [
			"Scaffold base del CLI",
			"Storage local basado en archivos",
			"Auth login y logout para Habitica",
			"Pipeline de sync y proyección de estado",
			"Comando status con renderer de terminal",
			"Registro de eventos e historial local",
		],
		stack: [
			{ category: "CLI", items: ["TypeScript", "Node.js"] },
			{ category: "Integraciones", items: ["Habitica API"] },
			{ category: "Persistencia", items: ["File-based storage"] },
		],
		links: [
			{ label: "Repositorio", url: "https://github.com/davosdo/questd", icon: "i-lucide-github" },
		],
		images: {
			hero: "https://placehold.co/1200x600/1a1a2e/6366f1?text=Questd+Hero",
			gallery: [
				"https://placehold.co/800x500/1a1a2e/6366f1?text=CLI+Demo",
			],
		},
	},
	{
		title: "Vitalia",
		slug: "vitalia",
		description:
			"App Flutter para mejorar adherencia a tratamientos con recordatorios confiables, fallback por WhatsApp y personalización controlada.",
		tags: ["Flutter", "WhatsApp", "Reminders", "Health"],
		show: true,
		importance: "low",
		status: "concept",
		longDescription:
			"Vitalia es una app móvil enfocada en adherencia esencial: ayudar a que una persona recuerde, confirme y sostenga su tratamiento con la menor fricción posible. La propuesta combina recordatorios locales, historial de adherencia, fallback por WhatsApp y una capa ligera de personalización asistida por IA con reglas de seguridad, priorizando confianza y utilidad antes que complejidad clínica o features accesorias.",
		role: "Mobile Developer & Creator",
		year: "2025 – presente",
		features: [
			"Gestión de horarios de medicación",
			"Scheduling local de notificaciones",
			"Confirmación de dosis e historial de adherencia",
			"Recordatorios por WhatsApp",
			"Fallback reminder flow",
			"Personalización asistida por IA con reglas de seguridad",
		],
		stack: [
			{ category: "Mobile", items: ["Flutter", "Dart"] },
			{ category: "Core Flows", items: ["Local notifications", "Medication scheduling"] },
			{ category: "Integraciones", items: ["WhatsApp fallback"] },
		],
		links: [
			{ label: "Repositorio", url: "https://github.com/davosdo/vitalia", icon: "i-lucide-github" },
		],
		images: {
			hero: "https://placehold.co/1200x600/1a1a2e/6366f1?text=Vitalia+Hero",
			gallery: [
				"https://placehold.co/800x500/1a1a2e/6366f1?text=Reminders",
				"https://placehold.co/800x500/1a1a2e/6366f1?text=Tracking",
			],
		},
	},
	{
		title: "RutaSec",
		slug: "rutasec",
		description:
			"Plataforma web para aprender ciberseguridad con recursos curados, rutas claras y progreso personal medible.",
		tags: ["Astro", "Cloudflare", "Content", "Better Auth"],
		show: true,
		importance: "low",
		status: "concept",
		longDescription:
			"RutaSec busca ordenar el aprendizaje de ciberseguridad convirtiendo recursos dispersos en rutas concretas, medibles y más fáciles de seguir. El MVP se enfoca en un catálogo público con atribución clara, biblioteca personal, objetivos de aprendizaje y seguimiento básico de progreso, arrancando por una ruta específica de Web Pentesting & Bug Bounty para evitar amplitud prematura.",
		role: "Fullstack Developer & Creator",
		year: "2025 – presente",
		features: [
			"Catálogo público de recursos con atribución clara",
			"Buscador y filtros básicos",
			"Biblioteca personal",
			"Objetivos de aprendizaje",
			"Timeline simple",
			"Estados de progreso",
		],
		stack: [
			{ category: "Frontend", items: ["Astro", "TypeScript", "Tailwind CSS"] },
			{ category: "Auth", items: ["Better Auth"] },
			{ category: "Infraestructura", items: ["Cloudflare Pages", "Cloudflare Workers", "Cloudflare D1"] },
		],
		links: [
			{ label: "Repositorio", url: "https://github.com/davosdo/rutasec", icon: "i-lucide-github" },
		],
		images: {
			hero: "https://placehold.co/1200x600/1a1a2e/6366f1?text=RutaSec+Hero",
			gallery: [
				"https://placehold.co/800x500/1a1a2e/6366f1?text=Learning+Path",
				"https://placehold.co/800x500/1a1a2e/6366f1?text=Resources",
			],
		},
	},
	{
		title: "TyriaPilot",
		slug: "tyriapilot",
		description:
			"Companion app para Guild Wars 2 que convierte datos de cuenta y objetivos del jugador en una siguiente acción clara.",
		tags: ["Nuxt", "Cloudflare", "GW2 API", "MVP"],
		show: true,
		importance: "low",
		status: "concept",
		longDescription:
			"TyriaPilot es una companion app guiada para Guild Wars 2 centrada en una pregunta simple: qué debería hacer ahora. En lugar de competir por profundidad con herramientas como gw2efficiency, apuesta por guidance, onboarding liviano y decisiones accionables. El MVP está recortado a demo mode, conexión por API key, snapshot de cuenta, un objetivo de crafting/materiales y un checklist determinístico de siguiente acción, cuidando además la privacidad de los datos del jugador.",
		role: "Developer & Creator",
		year: "2025 – presente",
		features: [
			"Landing page y demo mode con cuenta sample",
			"Conexión por API key",
			"Account snapshot de wallet, materiales y personajes",
			"Goal planner para crafting/materiales",
			"Owned vs missing breakdown",
			"Checklist determinístico de siguiente acción",
		],
		stack: [
			{ category: "Frontend", items: ["Nuxt 4", "Tailwind", "Nuxt UI"] },
			{ category: "Backend", items: ["Cloudflare Workers"] },
			{ category: "Datos", items: ["Cloudflare KV", "Cloudflare D1 (later)"] },
			{ category: "Integraciones", items: ["Guild Wars 2 API"] },
		],
		links: [
			{ label: "Repositorio", url: "https://github.com/davosdo/tyriapilot", icon: "i-lucide-github" },
		],
		images: {
			hero: "https://placehold.co/1200x600/1a1a2e/6366f1?text=TyriaPilot+Hero",
			gallery: [
				"https://placehold.co/800x500/1a1a2e/6366f1?text=Dashboard",
				"https://placehold.co/800x500/1a1a2e/6366f1?text=Action+Plan",
			],
		},
	}
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
	return projects.find((p) => p.slug === slug);
}

export function getVisibleProjects(): ProjectDetail[] {
	return projects.filter((p) => p.show);
}

const importanceRank: Record<ProjectImportance, number> = {
	high: 0,
	medium: 1,
	low: 2,
};

function normalizeTechnologyTerm(term: string): string {
	return term
		.toLowerCase()
		.replace(/\([^)]*\)/g, "")
		.replace(/\bv?\d+(\.\d+)*\b/g, "")
		.replace(/\bcss\b/g, "")
		.replace(/\s+/g, " ")
		.trim();
}

export function getProjectTechnologyTerms(project: ProjectDetail): string[] {
	const stackItems = project.stack.flatMap((group) => group.items);
	const terms = [...project.tags, ...stackItems]
		.map(normalizeTechnologyTerm)
		.filter(Boolean);

	return [...new Set(terms)];
}

export function getRelatedProjects(
	project: ProjectDetail,
	limit = 3,
): ProjectDetail[] {
	const sourceTerms = new Set(getProjectTechnologyTerms(project));

	return projects
		.map((candidate, index) => {
			const matches = getProjectTechnologyTerms(candidate).filter((term) =>
				sourceTerms.has(term),
			);

			return {
				project: candidate,
				index,
				score: matches.length,
			};
		})
		.filter(({ project: candidate, score }) =>
			candidate.show && candidate.slug !== project.slug && score > 0
		)
		.sort((a, b) => {
			const scoreDelta = b.score - a.score;
			const importanceDelta =
				importanceRank[a.project.importance] -
				importanceRank[b.project.importance];

			return scoreDelta || importanceDelta || a.index - b.index;
		})
		.slice(0, limit)
		.map(({ project: relatedProject }) => relatedProject);
}

export function getStatusLabel(status: ProjectStatus): string {
	const labels: Record<ProjectStatus, string> = {
		production: "En producción",
		beta: "Beta",
		development: "En desarrollo",
		concept: "Concepto",
	};
	return labels[status];
}

export function getStatusVariant(status: ProjectStatus): "primary" | "default" | "muted" {
	const variants: Record<ProjectStatus, "primary" | "default" | "muted"> = {
		production: "primary",
		beta: "default",
		development: "default",
		concept: "muted",
	};
	return variants[status];
}
