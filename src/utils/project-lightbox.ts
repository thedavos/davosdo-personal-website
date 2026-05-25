export const PROJECT_LIGHTBOX_OPEN_ATTR = "data-lightbox-open";
export const PROJECT_LIGHTBOX_DIALOG_SELECTOR = "[data-project-lightbox-dialog]";

export function isProjectLightboxOpen(): boolean {
	if (typeof document === "undefined") return false;
	return document.documentElement.hasAttribute(PROJECT_LIGHTBOX_OPEN_ATTR);
}

export function setProjectLightboxOpen(open: boolean): void {
	document.documentElement.toggleAttribute(PROJECT_LIGHTBOX_OPEN_ATTR, open);
}
