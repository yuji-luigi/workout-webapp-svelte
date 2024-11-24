import type { FormTableField } from '../../../../types/form/form-table-field';

export const workoutFormTable: FormTableField[] = [
	{
		name: 'id',
		label: 'ID',
		type: 'number',
		hidden: true
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
		type: 'id-input',
		collection: 'exercise',
		hidden: true,
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
		hidden: true,
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
	// {
	// 	name: 'use_active_time',
	// 	label: 'Use Active Time',
	// 	type: 'boolean',
	// 	tableConfig: {
	// 		hidden: true
	// 	}
	// },
	// {
	// 	name: 'use_active_time',
	// 	label: 'Use Rest Time',
	// 	type: 'boolean',
	// 	tableConfig: {
	// 		hidden: true
	// 	}
	// },
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
