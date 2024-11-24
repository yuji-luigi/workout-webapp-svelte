import type { FormTableField } from '../../../types/form/form-table-field';

export const excludeFormHidden = (formTableField: FormTableField) => true;
// formTableField.hidden !== true && formTableField.formFieldConfig?. !== true;
