export type ExperienceItem = {
	role: string;
	company: string;
	period: string;
	location?: string;
	description: string;
	highlights: string[];
	tags: string[];
};

export const experienceItems: ExperienceItem[] = [
	{
		role: "Software Engineer II",
		company: "Interbank",
		period: "Ago 2025 - Actualidad",
		location: "Perú",
		description:
			"Desarrollo soluciones frontend para banca por internet, con foco en flujos críticos, seguridad y estabilidad de producto.",
		highlights: [
			"Resolví problemas de seguridad de clasificación alta y media en proyectos principales.",
			"Implementé soluciones de seguridad en flujos bancarios de alta importancia.",
			"Desarrollé funcionalidades urgentes en flujos de tipo de cambio.",
		],
		tags: ["JavaScript", "TypeScript", "Vue.js", "Angular.js", "CSS", "HTML"],
	},
	{
		role: "Senior Frontend Developer",
		company: "Global66",
		period: "May 2021 - May 2025",
		location: "Latam",
		description:
			"Construí interfaces web y móviles para una fintech chilena con presencia regional, colaborando con equipos de producto, backend y diseño.",
		highlights: [
			"Desarrollé interfaces responsivas optimizadas para UX y performance.",
			"Creé una biblioteca de componentes UI modulares y reutilizables para escalar el trabajo del equipo.",
			"Implementé soluciones frontend para sistemas bancarios de Colombia, Chile y Perú considerando regulaciones locales.",
			"Documenté componentes, procesos técnicos y estándares de desarrollo para el equipo frontend.",
		],
		tags: ["JavaScript", "Vue.js", "NativeScript", "Tailwind", "Testing", "APIs"],
	},
	{
		role: "Lead Frontend Developer",
		company: "FractalUp",
		period: "Ene 2019 - Abr 2021",
		location: "EdTech",
		description:
			"Lideré el desarrollo frontend en una startup EdTech enfocada en plataformas de educación online.",
		highlights: [
			"Lideré un equipo de desarrolladores junior y supervisé la ejecución de proyectos.",
			"Diseñé arquitectura frontend para aplicaciones de clases grabadas y exámenes.",
			"Optimicé plataformas existentes, logrando mejoras significativas en velocidad de carga.",
			"Coordiné integraciones backend y realicé code reviews para asegurar calidad y buenas prácticas.",
		],
		tags: ["JavaScript", "TypeScript", "Vue.js", "Node.js", "Quasar", "GraphQL"],
	},
];
