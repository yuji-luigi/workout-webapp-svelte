import type { ExerciseJoined } from '../../../../types/db/exercise';
import type { RoutineJoined } from '../../../../types/db/routine';
import type { Workout } from '../../../../types/db/workout';
import type { FormTableField } from '../../../../types/form/form-table-field';

export const routineFormTableJson = [
	{
		name: 'name',
		label: 'Name of the workout',
		type: 'text',
		required: true
	},
	{
		name: 'description',
		label: 'Description',
		type: 'text',
		required: true
	},
	{
		name: 'slug',
		label: 'slug',
		type: 'slug',
		from: 'name',
		formFieldConfig: { hidden: true },
		required: true
	},

	{
		name: 'blocks',
		label: 'Sets',
		collection: 'workout_set',
		type: 'multi-select',
		formFieldConfig: { type: 'sets-config-section-input' },
		required: true
	},

	// {
	// 	name: 'image',
	// 	label: 'Image',
	// 	type: 'image'
	// },

	{
		name: 'created_by',
		label: 'Created By ID',
		type: 'number',
		required: false,
		formFieldConfig: { hidden: true }
	}
] satisfies (FormTableField & { name: keyof RoutineJoined | 'exercises' | '' })[];
