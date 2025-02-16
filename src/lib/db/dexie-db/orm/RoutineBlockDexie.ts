import type { ExerciseInRoutineJoined } from '../../../../types/db/exercise';
import type { RoutineBlockJoined } from '../../../../types/db/routine_block_interface';
import { ValidationError } from '../../../errors/validation-error';
import { db } from '../dexie-db';
import type { RoutineBlockType } from './RoutineBlockTypeDexie';

export class RoutineBlock {
	id!: number;
	slug!: string;
	type!: RoutineBlockType;
	name!: string;
	exercises!: ExerciseInRoutineJoined[];
	n_set!: number;

	constructor({
		slug,
		type,
		name,
		exercises,
		n_set
	}: {
		slug: string;
		type: RoutineBlockType;
		name: string;
		exercises: ExerciseInRoutineJoined[];
		n_set: number;
	}) {
		this.id = new Date().getTime();
		this.slug = slug;
		this.type = type;
		this.name = name;
		this.exercises = exercises;
		this.n_set = n_set;
	}

	private validate(fields: Partial<RoutineBlockJoined>) {
		const errors: Record<string, string> = {};

		if (!this.exercises?.length) {
			errors[`exercises`] = 'Exercises are required. select at least one exercise';
		}
		if (!this.type) {
			errors[`type`] = 'Type is required';
		}
		if (Object.keys(errors).length) {
			throw new ValidationError(errors);
		}
		return true;
	}

	save() {
		return db.wSet.put(this);
	}

	static checkFields(fields: RoutineBlockJoined) {
		new RoutineBlock(fields).validate(fields);
	}
	static async add(fields: Partial<RoutineBlock>): Promise<RoutineBlock> {
		const instance = new RoutineBlock();
		Object.assign(instance, fields); // Assign fields to the instance
		await instance.save(); // Save to the database
		return instance;
	}
}
