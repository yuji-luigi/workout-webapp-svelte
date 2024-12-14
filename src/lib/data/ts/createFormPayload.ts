import type { FormTableField } from '../../../types/form/form-table-field';

// Generic function that works for any T
export function createFormPayload<T>(
	fields: (FormTableField & { name: keyof T })[],
	formData: Record<string, unknown>
): Pick<T, (typeof fields)[number]['name']> {
	const result = {} as Pick<T, (typeof fields)[number]['name']>;

	for (const field of fields) {
		const { name } = field;
		// In a real scenario, you may want to parse/validate formData[name] based on `field.type`.
		result[name] = formData[name] as T[typeof name];
	}

	return result;
}
