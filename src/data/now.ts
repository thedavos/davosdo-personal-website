export type NowProject = {
	title: string;
	href: string;
	description: string;
	status: string;
};

export const nowProjects: NowProject[] = [
	{
		title: "Futrob",
		href: "https://github.com/thedavos/futrob",
		description:
			"Plataforma multi-tenant para ligas y copas de EA SPORTS FC Clubs: calendario, resultados oficiales, tablas y rankings.",
		status: "en desarrollo",
	},
	{
		title: "Vitalia",
		href: "https://github.com/davion-software/vitalia",
		description:
			"Pastillero y alarma para iOS y Android hecho en Flutter. Sin cuentas ni backend: los datos se quedan en el teléfono.",
		status: "en desarrollo",
	},
];
