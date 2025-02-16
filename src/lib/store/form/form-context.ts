import { getContext, setContext } from 'svelte';
import type { FormTableField } from '../../../types/form/form-table-field';

export const setFormIdCtx = (id: string) => {
	setContext('form_id', id);
};

export const getFormIdCtx = (): string => getContext('form_id') || 'no_form_id';

export const setFormTableJsonCtx = (json: FormTableField[]) => {
	setContext('form_table_json', json);
};

export const getFormTableJsonCtx = (): FormTableField[] => {
	const json = getContext('form_table_json');
	if (!json) {
		throw new Error('Form table json not found');
	}
	return json as FormTableField[];
};
