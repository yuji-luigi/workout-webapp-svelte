import type { FormTableField } from '../../../types/form/form-table-field';

export const excludeFormHidden = (formTableField: FormTableField) =>
	formTableField.hidden !== true && formTableField.tableConfig?.hidden !== true;
