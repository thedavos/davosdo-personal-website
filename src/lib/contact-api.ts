export const MAX_CONTACT_BODY_BYTES = 16_384;
export const CONTACT_HONEYPOT_FIELD = "company_website";
export const CONTACT_SUBMIT_ID_FIELD = "submit_id";
export const IDEMPOTENCY_CACHE_TTL_SECONDS = 300;

const UUID_V4_PATTERN =
	/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const JSON_HEADERS = { "Content-Type": "application/json" } as const;

function getDefaultCache(): Cache {
	return (caches as CacheStorage & { default: Cache }).default;
}

export function contactJsonResponse(
	body: { ok: boolean; error?: string },
	status: number,
): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: JSON_HEADERS,
	});
}

export function contactSuccessResponse(): Response {
	return contactJsonResponse({ ok: true }, 200);
}

export function isBodyTooLarge(request: Request): boolean {
	const contentLength = request.headers.get("content-length");
	if (contentLength === null) {
		return false;
	}

	const size = Number(contentLength);
	return !Number.isFinite(size) || size > MAX_CONTACT_BODY_BYTES;
}

export function isHoneypotTriggered(value: unknown): boolean {
	return String(value ?? "").trim().length > 0;
}

export function isValidSubmitId(value: unknown): boolean {
	const submitId = String(value ?? "").trim();
	return UUID_V4_PATTERN.test(submitId);
}

function idempotencyCacheKey(submitId: string): string {
	return `https://contact-idem.local/${submitId}`;
}

export async function getCachedIdempotentResponse(
	submitId: string,
): Promise<Response | null> {
	const cached = await getDefaultCache().match(idempotencyCacheKey(submitId));
	if (!cached) {
		return null;
	}

	const headers = new Headers(cached.headers);
	headers.set("Content-Type", "application/json");
	const body = await cached.text();

	return new Response(body, { status: 200, headers });
}

export async function cacheIdempotentResponse(submitId: string): Promise<void> {
	const response = new Response(JSON.stringify({ ok: true }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": `max-age=${IDEMPOTENCY_CACHE_TTL_SECONDS}`,
		},
	});

	await getDefaultCache().put(idempotencyCacheKey(submitId), response);
}

export async function parseContactRequestBody(
	request: Request,
): Promise<Record<string, unknown> | null> {
	try {
		const contentType = request.headers.get("content-type") ?? "";

		if (contentType.includes("application/json")) {
			return (await request.json()) as Record<string, unknown>;
		}

		const formData = await request.formData();
		return Object.fromEntries(formData.entries());
	} catch {
		return null;
	}
}

export function toContactFields(body: Record<string, unknown>): {
	name: string;
	email: string;
	service: string;
	budget: string;
	message: string;
} {
	return {
		name: String(body.name ?? ""),
		email: String(body.email ?? ""),
		service: String(body.service ?? ""),
		budget: String(body.budget ?? ""),
		message: String(body.message ?? ""),
	};
}
