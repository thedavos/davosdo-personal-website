export type ContactBudgetOption = {
	value: string;
	label: string;
};

export const contactBudgetOptions: ContactBudgetOption[] = [
	{ value: "under-1000", label: "Menos de $1,000 USD" },
	{ value: "1000-3000", label: "$1,000 – $3,000 USD" },
	{ value: "3000-7000", label: "$3,000 – $7,000 USD" },
	{ value: "7000-15000", label: "$7,000 – $15,000 USD" },
	{ value: "over-15000", label: "Más de $15,000 USD" },
	{ value: "not-defined", label: "Aún no lo tengo definido" },
];

const budgetByValue = new Map(
	contactBudgetOptions.map((option) => [option.value, option]),
);

export function getContactBudgetLabel(value: string): string | undefined {
	return budgetByValue.get(value)?.label;
}

export function isValidContactBudget(value: string): boolean {
	return budgetByValue.has(value);
}
