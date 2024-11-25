import type { WorkoutJoined } from '../../../../types/db/workout';
import type { FormTableField } from '../../../../types/form/form-table-field';

export const workoutFormTable: (FormTableField & { name: keyof WorkoutJoined })[] = [
	{
		name: 'id',
		label: 'ID',
		type: 'id-input',
		collection: 'workout',
		formFieldConfig: { hidden: true }
	},
	{
		name: 'exercise_name',
		label: 'Exercise name',
		type: 'text'
	},
	{
		name: 'slug',
		label: 'Slug',
		type: 'text'
	},
	{
		name: 'exercise_id',
		label: 'Exercise ID',
		type: 'id-input',
		collection: 'exercise',
		formFieldConfig: { hidden: true }
	},

	{
		name: 'exercise_description',
		label: 'Description',
		type: 'text'
	},

	{
		name: 'use_active_time',
		label: 'Use Active Time',
		type: 'boolean',
		formFieldConfig: { hidden: true }
	},
	{
		name: 'use_active_time',
		label: 'Use Rest Time',
		type: 'boolean',
		formFieldConfig: { hidden: true }
	},
	{
		name: 'created_by_id',
		label: 'Created By ID',
		type: 'number',
		formFieldConfig: { hidden: true }
	},
	{
		name: 'created_by_name',
		label: 'Created By Name',
		formFieldConfig: { hidden: true },
		type: 'text'
	}
];
