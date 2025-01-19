import type {
	RoutineBlock,
	RoutineBlockJoined
} from '../../../../types/db/routine_block_interface';
import type { FormTableField } from '../../../../types/form/form-table-field';

export const workoutTypeFormTable = [
	{
		name: 'id',
		label: 'ID',
		type: 'id-input',
		collection: 'workout_set_type',
		required: true,
		formFieldConfig: { hidden: true }
	},
	{
		name: 'name',
		label: 'Label',
		type: 'text',
		required: true
	},
	{
		name: 'slug',
		label: 'Slug',
		type: 'text',
		required: true
	},
	{
		name: 'description',
		label: 'Description',
		type: 'textarea',
		required: false
	},
	{
		name: 'type',
		label: 'Set type',
		type: 'select-single',
		collection: 'workout_set_type',
		required: true
	},
	{
		name: 'exercises',
		label: 'Exercises',
		type: 'multi-select',
		required: true
	}
] satisfies (FormTableField & { name: keyof RoutineBlockJoined })[];
