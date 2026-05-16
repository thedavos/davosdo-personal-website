import type { NavigationItem } from "@/types";

export const normalizePath = (path: string) => {
	if (!path || path === "/") return "/";
	return path.replace(/\/+$/, "");
};

export const getOrderedNavItems = (navItems: NavigationItem[]) =>
	[...navItems].sort((a, b) => a.navigationOrder - b.navigationOrder);

export const getCurrentNavIndex = (
	navItems: NavigationItem[],
	currentPath: string,
) => {
	const normalizedCurrentPath = normalizePath(currentPath);
	const exactIndex = navItems.findIndex(
		(item) => normalizePath(item.url) === normalizedCurrentPath,
	);

	if (exactIndex >= 0) return exactIndex;

	const currentSegment = normalizedCurrentPath.match(/[^/]+/g)?.[0] ?? "";
	return navItems.findIndex((item) => item.url === `/${currentSegment}`);
};

export const getCircularNavItems = (
	navItems: NavigationItem[],
	currentPath: string,
) => {
	const orderedItems = getOrderedNavItems(navItems);
	const currentIndex = getCurrentNavIndex(orderedItems, currentPath);

	if (currentIndex < 0 || !orderedItems.length) {
		return {
			orderedItems,
			previousItem: null,
			nextItem: null,
		};
	}

	return {
		orderedItems,
		previousItem:
			orderedItems[
				(currentIndex - 1 + orderedItems.length) % orderedItems.length
			],
		nextItem: orderedItems[(currentIndex + 1) % orderedItems.length],
	};
};

export const getCircularNavUrl = (
	navItems: NavigationItem[],
	currentPath: string,
	direction: "previous" | "next",
) => {
	if (!navItems.length) return null;

	const currentIndex = getCurrentNavIndex(navItems, currentPath);
	if (currentIndex < 0) return null;

	const nextIndex =
		direction === "previous"
			? (currentIndex - 1 + navItems.length) % navItems.length
			: (currentIndex + 1) % navItems.length;

	return navItems[nextIndex]?.url ?? null;
};

export const navigateTo = (url: string) => {
	const link = document.createElement("a");
	link.href = url;
	link.style.display = "none";
	document.body.appendChild(link);
	link.click();
	link.remove();
};
