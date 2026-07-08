export type ClientTrustBadge = {
	name: string;
	logoSrc: string;
	logoAlt: string;
	href?: string;
};

export const clientTrustBadges: ClientTrustBadge[] = [
	{
		name: "interbank",
		logoSrc: "/logos/interbank.svg",
		logoAlt: "Interbank",
		href: "https://interbank.pe",
	},
	{
		name: "global66",
		logoSrc: "/logos/global66.svg",
		logoAlt: "Global66",
		href: "https://global66.com",
	},
	{
		name: "fractalup",
		logoSrc: "/logos/fractalup.svg",
		logoAlt: "FractalUp",
		href: "https://fractalup.com",
	},
];
