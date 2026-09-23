export type SocialIconComponent = "x" | "bluesky" | "hackthebox";

export type SocialLink = {
	label: string;
	href: string;
	handle: string;
	icon?: string;
	iconComponent?: SocialIconComponent;
	external: boolean;
};

export const socialLinks: SocialLink[] = [
	{
		label: "Email",
		href: "mailto:hola@davosdo.dev",
		handle: "hola@davosdo.dev",
		icon: "i-lucide-mail",
		external: false,
	},
	{
		label: "GitHub",
		href: "https://github.com/thedavos",
		handle: "@thedavos",
		icon: "i-lucide-github",
		external: true,
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/thedavos/",
		handle: "in/thedavos",
		icon: "i-lucide-linkedin",
		external: true,
	},
	{
		label: "X",
		href: "https://x.com/davosdodev",
		handle: "@davosdodev",
		iconComponent: "x",
		external: true,
	},
	{
		label: "Bluesky",
		href: "https://bsky.app/profile/davoscode.bsky.social",
		handle: "@davoscode.bsky.social",
		iconComponent: "bluesky",
		external: true,
	},
	{
		label: "Hack The Box",
		href: "https://profile.hackthebox.com/profile/019dad09-0788-7249-9f3b-00d8edd49171",
		handle: "perfil",
		iconComponent: "hackthebox",
		external: true,
	},
];
