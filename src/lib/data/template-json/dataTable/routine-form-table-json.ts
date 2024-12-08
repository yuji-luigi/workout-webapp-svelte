import type { ExerciseJoined } from '../../../../types/db/exercise';
import type { RoutineJoined } from '../../../../types/db/routine';
import type { Workout } from '../../../../types/db/workout';
import type { FormTableField } from '../../../../types/form/form-table-field';

export const workoutFormTable: (FormTableField & { name: keyof RoutineJoined })[] = [
	{
		name: 'id',
		label: 'ID',
		type: 'id-input',
		collection: 'workout',
		formFieldConfig: { hidden: true }
	},
	{
		name: 'name',
		label: 'Name of the routine/workout',
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
		name: 'workouts',
		label: 'Workouts',
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
