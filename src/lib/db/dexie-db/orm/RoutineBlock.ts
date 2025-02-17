import type { ExerciseInRoutineJoined } from '../../../../types/db/exercise';
import type { RoutineBlockJoined } from '../../../../types/db/routine_block_interface';
import { ValidationError } from '../../../errors/validation-error';
import { db } from '../dexie-db';
import { Exercise } from './Exercise';
import type { RoutineBlockType } from './RoutineBlockTypeDexie';

export class RoutineBlock {
	id!: number;
	slug!: string;
	type!: RoutineBlockTypeI;
	name!: string;
	exercises!: ExerciseInRoutineJoined[];
	n_set!: number;

	constructor(fields: RoutineBlockJoined) {
		const _exercises = fields.exercises.map((exercise) => {
			return new Exercise(exercise);
		});
		fields.exercises = _exercises;
		RoutineBlock.validate(fields);
		console.log(fields.n_set);
		this.id = new Date().getTime();
		this.slug = fields.slug;
		this.type = fields.type;
		this.name = fields.name;
		this.exercises = _exercises;
		this.n_set = fields.n_set;
	}

	static validate(fields: Partial<RoutineBlockJoined>) {
		const errors: Record<string, string> = {};

		if (!fields.exercises?.length) {
			errors[`exercises`] = 'Exercises are required. select at least one exercise';
		}

		if (!fields.n_set) {
			errors[`n_set`] = 'Number of sets is required';
		}

		if (!fields.type) {
			errors[`type`] = 'Type is required';
		}

		if (Object.keys(errors).length) {
			throw new ValidationError(errors);
		}
		if (fields.exercises?.length) {
			fields.exercises.forEach((exercise) => {
				Exercise.validate(exercise);
			});
		}
		return true;
	}
}
