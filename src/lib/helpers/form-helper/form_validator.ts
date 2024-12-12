import type { FormTableField } from '../../../types/form/form-table-field';

export function validateForm(data: any, formTableJson: FormTableField[]) {
	const errors: Record<string, string> = {};
	formTableJson.forEach((fieldConfig) => {
		const isMulti = fieldConfig.multiple;
		const isRequired = fieldConfig.required;

		/** only multi field */
		if (isMulti) {
			if (isRequired) {
				if (!Array.isArray(data[fieldConfig.name]) || !data[fieldConfig.name].length) {
					errors[fieldConfig.name] = 'This field should be an array';
				}
			}
			return;
		}

		/** only single.(return at the end in multi scope) */
		if (isRequired) {
			if (
				data[fieldConfig.name] === undefined ||
				data[fieldConfig.name] === null ||
				data[fieldConfig.name] === ''
			) {
				errors[fieldConfig.name] = 'This field is required';
			}
		}
	});
	if (Object.keys(errors).length === 0) return null;
	throw errors;
}
