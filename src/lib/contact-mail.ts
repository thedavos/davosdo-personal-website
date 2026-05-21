import { getContactBudgetLabel, isValidContactBudget } from "@/data/contact-budgets";
import { getServiceBySlug } from "@data/services";
import { EmailMessage } from "cloudflare:email";

export type ContactPayload = {
	name: string;
	email: string;
	service: string;
	budget: string;
	message: string;
};

export type ContactMailConfig = {
	sendEmail: SendEmail;
	fromEmail: string;
	toEmail: string;
};

export type ContactValidationResult =
	| { ok: true; data: ContactPayload }
	| { ok: false; error: string; status: number };

export type ContactMailResult =
	| { ok: true }
	| { ok: false; error: string; status: number };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function encodeMimeHeader(value: string): string {
	return value.replace(/[\r\n]+/g, " ").trim();
}

function buildPlainTextEmail({
	fromEmail,
	toEmail,
	replyTo,
	subject,
	body,
}: {
	fromEmail: string;
	toEmail: string;
	replyTo: string;
	subject: string;
	body: string;
}): string {
	const headers = [
		`From: ${encodeMimeHeader(fromEmail)}`,
		`To: ${encodeMimeHeader(toEmail)}`,
		`Reply-To: ${encodeMimeHeader(replyTo)}`,
		`Subject: ${encodeMimeHeader(subject)}`,
		"MIME-Version: 1.0",
		"Content-Type: text/plain; charset=UTF-8",
		"Content-Transfer-Encoding: 8bit",
	];

	return `${headers.join("\r\n")}\r\n\r\n${body}`;
}

export function validateContactPayload(
	payload: Partial<ContactPayload>,
): ContactValidationResult {
	const name = payload.name?.trim() ?? "";
	const email = payload.email?.trim() ?? "";
	const service = payload.service?.trim() ?? "";
	const budget = payload.budget?.trim() ?? "";
	const message = payload.message?.trim() ?? "";

	if (!name || !email || !service || !budget || !message) {
		return {
			ok: false,
			error: "Completa todos los campos del formulario.",
			status: 400,
		};
	}

	if (!EMAIL_PATTERN.test(email)) {
		return {
			ok: false,
			error: "Introduce un email válido.",
			status: 400,
		};
	}

	if (!getServiceBySlug(service)) {
		return {
			ok: false,
			error: "Selecciona un servicio válido.",
			status: 400,
		};
	}

	if (!isValidContactBudget(budget)) {
		return {
			ok: false,
			error: "Selecciona un rango de presupuesto válido.",
			status: 400,
		};
	}

	return {
		ok: true,
		data: { name, email, service, budget, message },
	};
}

export async function sendContactEmail(
	config: ContactMailConfig,
	payload: ContactPayload,
): Promise<ContactMailResult> {
	const serviceTitle = getServiceBySlug(payload.service)?.title ?? payload.service;
	const budgetLabel = getContactBudgetLabel(payload.budget) ?? payload.budget;

	const subject = `[Contacto] ${serviceTitle} — ${payload.name}`;
	const body = [
		`Nombre: ${payload.name}`,
		`Email: ${payload.email}`,
		`Servicio: ${serviceTitle}`,
		`Presupuesto: ${budgetLabel}`,
		"",
		"Mensaje:",
		payload.message,
	].join("\n");

	const raw = buildPlainTextEmail({
		fromEmail: config.fromEmail,
		toEmail: config.toEmail,
		replyTo: payload.email,
		subject,
		body,
	});

	const message = new EmailMessage(config.fromEmail, config.toEmail, raw);

	try {
		await config.sendEmail.send(message);
		return { ok: true };
	} catch (error) {
		console.error("Cloudflare Email send error:", error);

		return {
			ok: false,
			error: "No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.",
			status: 502,
		};
	}
}

export function getContactMailConfig(env: {
	SEND_EMAIL?: SendEmail;
	CONTACT_FROM_EMAIL?: string;
	CONTACT_TO_EMAIL?: string;
}): ContactMailConfig | null {
	const sendEmail = env.SEND_EMAIL;
	const fromEmail = env.CONTACT_FROM_EMAIL?.trim();
	const toEmail = env.CONTACT_TO_EMAIL?.trim();

	if (!sendEmail || !fromEmail || !toEmail) {
		return null;
	}

	return { sendEmail, fromEmail, toEmail };
}
