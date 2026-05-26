export {};

type TurnstileRenderOptions = {
	sitekey: string;
	theme?: "auto" | "light" | "dark";
	size?: "normal" | "flexible" | "compact";
	action?: string;
};

type TurnstileApi = {
	ready: (callback: () => void) => void;
	render: (container: HTMLElement | string, options: TurnstileRenderOptions) => string;
	reset: (widgetId: string) => void;
	remove: (widgetId: string) => void;
	getResponse: (widgetId: string) => string | undefined;
};

declare global {
	// eslint-disable-next-line no-var
	var turnstile: TurnstileApi | undefined;
}
