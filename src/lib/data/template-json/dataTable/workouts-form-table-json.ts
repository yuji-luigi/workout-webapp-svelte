import type { ExerciseJoined } from '../../../../types/db/exercise';
import type { Workout } from '../../../../types/db/workout';
import type { FormTableField, PayloadFromForm } from '../../../../types/form/form-table-field';

export const workoutFormTable = [
	// {
	// 	name: 'id',
	// 	label: 'ID',
	// 	type: 'id-input',
	// 	collection: 'workout',
	// 	required: true,
	// 	formFieldConfig: { hidden: true }
	// },
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
	// {
	// 	name: 'description',
	// 	label: 'Description',
	// 	type: 'text'
	// },
	// {
	// 	name: 'type',
	// 	label: 'Workout Type',
	// 	collection: 'workout_type',
	// 	type: 'select-single',
	// 	required: true
	// },

	{
		name: 'exercises',
		label: 'Exercises',
		collection: 'exercise',
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
] satisfies (FormTableField & { name: keyof Workout | 'exercises' | '' })[];

export type WorkoutFormPayload = PayloadFromForm<typeof workoutFormTable>;
