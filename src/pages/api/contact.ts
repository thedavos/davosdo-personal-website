import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import {
	CONTACT_HONEYPOT_FIELD,
	CONTACT_SUBMIT_ID_FIELD,
	cacheIdempotentResponse,
	contactJsonResponse,
	contactSuccessResponse,
	getCachedIdempotentResponse,
	isBodyTooLarge,
	isHoneypotTriggered,
	isValidSubmitId,
	parseContactRequestBody,
	toContactFields,
} from "@/lib/contact-api";
import {
	getContactMailConfig,
	sendContactEmail,
	validateContactPayload,
} from "@/lib/contact-mail";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	if (isBodyTooLarge(request)) {
		return contactJsonResponse(
			{ ok: false, error: "La solicitud es demasiado grande." },
			413,
		);
	}

	const body = await parseContactRequestBody(request);

	if (!body) {
		return contactJsonResponse({ ok: false, error: "Solicitud inválida." }, 400);
	}

	if (isHoneypotTriggered(body[CONTACT_HONEYPOT_FIELD])) {
		return contactSuccessResponse();
	}

	const submitId = body[CONTACT_SUBMIT_ID_FIELD];

	if (!isValidSubmitId(submitId)) {
		return contactJsonResponse({ ok: false, error: "Solicitud inválida." }, 400);
	}

	const submitIdString = String(submitId).trim();
	const cachedResponse = await getCachedIdempotentResponse(submitIdString);

	if (cachedResponse) {
		return cachedResponse;
	}

	const validation = validateContactPayload(toContactFields(body));

	if (!validation.ok) {
		return contactJsonResponse(
			{ ok: false, error: validation.error },
			validation.status,
		);
	}

	const mailConfig = getContactMailConfig({
		SEND_EMAIL: env.SEND_EMAIL,
		CONTACT_FROM_EMAIL: env.CONTACT_FROM_EMAIL,
		CONTACT_TO_EMAIL: env.CONTACT_TO_EMAIL,
	});

	if (!mailConfig) {
		console.error("Contact mail env vars are not configured.");
		return contactJsonResponse(
			{
				ok: false,
				error:
					"El formulario no está configurado todavía. Escríbeme a hola@davosdo.dev.",
			},
			503,
		);
	}

	const result = await sendContactEmail(mailConfig, validation.data);

	if (!result.ok) {
		return contactJsonResponse({ ok: false, error: result.error }, result.status);
	}

	await cacheIdempotentResponse(submitIdString);

	return contactSuccessResponse();
};
