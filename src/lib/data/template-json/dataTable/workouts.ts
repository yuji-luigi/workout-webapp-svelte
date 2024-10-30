import type { FormTableField } from '../../../../types/form/table-def';

export const workoutFormTable: FormTableField[] = [
	{
		name: 'id',
		label: 'ID',
		type: 'number'
	},
	{
		name: 'slug',
		label: 'Slug',
		type: 'text',
		tableConfig: {
			hidden: true
		}
	},
	{
		name: 'exercise_id',
		label: 'Exercise ID',
		type: 'number',
		tableConfig: {
			hidden: true
		}
	},
	{
		name: 'exercise_name',
		label: 'Name',
		type: 'text'
	},
	{
		name: 'workout_type_id',
		label: 'Workout Type ID',
		type: 'number',
		tableConfig: {
			hidden: true
		}
	},
	{
		name: 'exercise_description',
		label: 'Description',
		type: 'text'
	},
	{
		name: 'name_workout_type',
		label: 'Workout Type',
		type: 'text'
	},
	{
		name: 'workout_type',
		label: 'Workout Type',
		type: 'text',
		tableConfig: {
			hidden: true
		}
	},
	{
		name: 'repeat',
		label: 'Repeat',
		type: 'boolean'
	},
	{
		name: 'useActiveTime',
		label: 'Use Active Time',
		type: 'boolean',
		tableConfig: {
			hidden: true
		}
	},
	{
		name: 'useRestTime',
		label: 'Use Rest Time',
		type: 'boolean',
		tableConfig: {
			hidden: true
		}
	},
	{
		name: 'created_by_id',
		label: 'Created By ID',
		type: 'number',
		tableConfig: {
			hidden: true
		}
	},
	{
		name: 'created_by_name',
		label: 'Created By Name',
		type: 'text'
	}
];
