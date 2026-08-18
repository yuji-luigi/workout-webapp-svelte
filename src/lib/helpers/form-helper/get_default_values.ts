import type { FormTableField } from '../../../types/form/form-table-field';

export function getFormDefaultValues(
	data: Record<string, any> | undefined,
	formTableJson: FormTableField[]
) {
	const defaultValues: Record<string, any> = {};
	for (const field of formTableJson) {
		if (data) {
			defaultValues[field.name] = data[field.name];
		} else {
			defaultValues[field.name] = field.defaultValue;
		}
	}
	return defaultValues;
}
