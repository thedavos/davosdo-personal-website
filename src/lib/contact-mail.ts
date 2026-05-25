import { getContactBudgetLabel, isValidContactBudget } from "@/data/contact-budgets";
import { escapeHtml, normalizeInput } from "@/utils/security";
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
const STRICT_EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const NAME_PATTERN = /^[\p{L}\p{M}'’ .-]+$/u;

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 80;
const EMAIL_MAX_LENGTH = 254;
const MESSAGE_MIN_LENGTH = 10;
const MESSAGE_MAX_LENGTH = 2000;

function encodeMimeHeader(value: string): string {
	return escapeHtml(value.replace(/[\r\n]+/g, " ").trim());
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
	const name = normalizeInput(payload.name ?? "");
	const email = normalizeInput(payload.email ?? "");
	const service = normalizeInput(payload.service ?? "");
	const budget = normalizeInput(payload.budget ?? "");
	const message = normalizeInput(payload.message ?? "", { multiline: true });

	if (!name || !email || !service || !budget || !message) {
		return {
			ok: false,
			error: "Completa todos los campos del formulario.",
			status: 400,
		};
	}

	if (
		name.length < NAME_MIN_LENGTH ||
		name.length > NAME_MAX_LENGTH ||
		!NAME_PATTERN.test(name)
	) {
		return {
			ok: false,
			error: "Introduce un nombre válido.",
			status: 400,
		};
	}

	if (
		email.length > EMAIL_MAX_LENGTH ||
		!EMAIL_PATTERN.test(email) ||
		!STRICT_EMAIL_PATTERN.test(email)
	) {
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

	if (
		message.length < MESSAGE_MIN_LENGTH ||
		message.length > MESSAGE_MAX_LENGTH
	) {
		return {
			ok: false,
			error: "El mensaje debe tener entre 10 y 2000 caracteres.",
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
