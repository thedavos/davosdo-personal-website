const CONTROL_CHARS_PATTERN = /[\u0000-\u001F\u007F-\u009F]/g;
const MULTILINE_CONTROL_CHARS_PATTERN =
	/[\u0000-\u0009\u000B\u000C\u000E-\u001F\u007F-\u009F]/g;

const HTML_ENTITIES: Record<string, string> = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;",
};

type NormalizeInputOptions = {
	multiline?: boolean;
};

export function normalizeInput(
	value: string,
	options: NormalizeInputOptions = {},
): string {
	const normalized = value.normalize("NFKC").replace(/\r\n?/g, "\n");
	const controlCharsPattern = options.multiline
		? MULTILINE_CONTROL_CHARS_PATTERN
		: CONTROL_CHARS_PATTERN;

	return normalized.replace(controlCharsPattern, "").trim();
}

export function escapeHtml(value: string): string {
	return value.replace(/[&<>"']/g, (char) => HTML_ENTITIES[char] ?? char);
}
