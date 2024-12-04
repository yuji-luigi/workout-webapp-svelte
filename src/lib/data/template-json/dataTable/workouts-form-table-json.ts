import type { ExerciseJoined } from '../../../../types/db/exercise';
import type { Workout } from '../../../../types/db/workout';
import type { FormTableField } from '../../../../types/form/form-table-field';

export const workoutFormTable: (FormTableField & { name: keyof Workout })[] = [
	{
		name: 'id',
		label: 'ID',
		type: 'id-input',
		collection: 'workout',
		formFieldConfig: { hidden: true }
	},
	{
		name: 'name',
		label: 'Name of the workout',
		type: 'text'
	},
	{
		name: 'slug',
		label: 'slug',
		type: 'slug',
		from: 'name',
		formFieldConfig: { hidden: true }
	},
	{
		name: 'description',
		label: 'Description',
		type: 'text'
	},
	{
		name: 'type',
		label: 'Workout Type',
		collection: 'workout_type',
		type: 'select-single'
	},
	{
		name: 'exercises',
		label: 'Exercises',
		collection: 'exercise',
		type: 'multi-select'
	},
	{
		name: 'image',
		label: 'Image',
		type: 'image'
	},

	{
		name: 'created_by',
		label: 'Created By ID',
		type: 'number',
		formFieldConfig: { hidden: true }
	}
];
