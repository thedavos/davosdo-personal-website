import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import {
	getContactMailConfig,
	sendContactEmail,
	validateContactPayload,
} from "@/lib/contact-mail";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	let body: Record<string, unknown>;

	try {
		const contentType = request.headers.get("content-type") ?? "";

		if (contentType.includes("application/json")) {
			body = (await request.json()) as Record<string, unknown>;
		} else {
			const formData = await request.formData();
			body = Object.fromEntries(formData.entries());
		}
	} catch {
		return new Response(
			JSON.stringify({ ok: false, error: "Solicitud inválida." }),
			{ status: 400, headers: { "Content-Type": "application/json" } },
		);
	}

	const validation = validateContactPayload({
		name: String(body.name ?? ""),
		email: String(body.email ?? ""),
		service: String(body.service ?? ""),
		budget: String(body.budget ?? ""),
		message: String(body.message ?? ""),
	});

	if (!validation.ok) {
		return new Response(JSON.stringify({ ok: false, error: validation.error }), {
			status: validation.status,
			headers: { "Content-Type": "application/json" },
		});
	}

	const mailConfig = getContactMailConfig({
		SEND_EMAIL: env.SEND_EMAIL,
		CONTACT_FROM_EMAIL: env.CONTACT_FROM_EMAIL,
		CONTACT_TO_EMAIL: env.CONTACT_TO_EMAIL,
	});

	if (!mailConfig) {
		console.error("Contact mail env vars are not configured.");
		return new Response(
			JSON.stringify({
				ok: false,
				error: "El formulario no está configurado todavía. Escríbeme a hola@davosdo.dev.",
			}),
			{ status: 503, headers: { "Content-Type": "application/json" } },
		);
	}

	const result = await sendContactEmail(mailConfig, validation.data);

	if (!result.ok) {
		return new Response(JSON.stringify({ ok: false, error: result.error }), {
			status: result.status,
			headers: { "Content-Type": "application/json" },
		});
	}

	return new Response(JSON.stringify({ ok: true }), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
};
