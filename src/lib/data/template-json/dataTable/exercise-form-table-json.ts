import type { Exercise } from '../../../../types/db/exercise';
import type { FormTableField } from '../../../../types/form/form-table-field';

export const exerciseFormTableJson: FormTableField[] = [
	{
		name: 'id',
		label: 'ID',
		type: 'id-input'
		// collection: 'exercise',
		// formFieldConfig: { hidden: true }
	},
	{
		name: 'name',
		label: 'Exercise name',
		type: 'text'
	},
	{
		name: 'slug',
		label: 'Slug',
		type: 'slug',
		from: 'name'
	},
	{
		name: 'description',
		label: 'Description',
		type: 'text'
	},
	{
		name: 'image',
		label: 'Image URL',
		type: 'image'
	}
];
