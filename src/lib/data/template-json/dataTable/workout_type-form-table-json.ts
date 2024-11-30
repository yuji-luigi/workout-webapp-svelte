import type { FormTableField } from '../../../../types/form/form-table-field';

export const workoutTypeFormTable: (FormTableField & { name: keyof WorkoutType })[] = [
	{
		name: 'id',
		label: 'ID',
		type: 'id-input',
		collection: 'workout_type',
		formFieldConfig: { hidden: true }
	},
	{
		name: 'name',
		label: 'Label',
		type: 'text'
	},
	{
		name: 'slug',
		label: 'Slug',
		type: 'text'
	},
	{
		name: 'use_active_time',
		label: 'Use Active Time',
		type: 'boolean'
	},
	{
		name: 'use_rest_time',
		label: 'Use Rest Time',
		type: 'boolean'
	}
];
