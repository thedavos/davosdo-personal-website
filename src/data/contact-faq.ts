export type ContactFaqItem = {
	id: string;
	question: string;
	answer: string;
};

export const contactFaqItems: ContactFaqItem[] = [
	{
		id: "response-time",
		question: "¿Cuánto tardas en responder?",
		answer:
			"Respondo en menos de 24 horas hábiles. Si tu mensaje incluye contexto sobre el proyecto, el objetivo y el plazo, puedo darte una primera orientación más concreta desde el primer correo.",
	},
	{
		id: "project-types",
		question: "¿Qué tipo de proyectos tomas?",
		answer:
			"Trabajo en web apps, apps móviles, ecommerce, bots de automatización, herramientas CLI e integraciones con IA. Me interesan ideas con producto claro, aunque estén en etapa temprana.",
	},
	{
		id: "timeline",
		question: "¿Cuánto tarda un proyecto típico?",
		answer:
			"Depende del alcance. Un MVP puede estar listo en 4–8 semanas; proyectos más amplios pueden extenderse varios meses. Tras la primera conversación te doy un estimado realista según funcionalidades, integraciones y prioridades.",
	},
	{
		id: "stack",
		question: "¿Con qué tecnologías trabajas?",
		answer:
			"En frontend uso Vue, React y Angular; en móvil Flutter y React Native; en backend Node.js, TypeScript y Go según el caso. Elijo stack según mantenibilidad, velocidad de entrega y lo que ya tenga tu equipo o producto.",
	},
	{
		id: "budget",
		question: "¿Cómo funciona el presupuesto?",
		answer:
			"Primero entiendo el problema y el resultado esperado. Luego propongo alcance por fases con precio claro: MVP, iteraciones o soporte continuo. Prefiero acuerdos transparentes antes de escribir código.",
	},
	{
		id: "maintenance",
		question: "¿Ofreces mantenimiento después del lanzamiento?",
		answer:
			"Sí. Puedo quedarme para correcciones, mejoras, nuevas features y despliegues. También documento el proyecto para que tu equipo interno pueda asumirlo cuando quieras.",
	},
];
