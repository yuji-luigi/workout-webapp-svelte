import type { ExerciseInSetWorkout } from '../../../types/db/exercise';
import type { WSetJoined } from '../../../types/db/WSetI';
import { ValidationError } from '../../errors/validation-error';
import { db } from './dexie-db';
import type { WSetType } from './WSetType';

export class WSet {
	id!: number;
	slug!: string;
	type!: WSetType;
	name!: string;
	exercises!: ExerciseInSetWorkout[];
	n_set!: number;

	constructor({
		slug,
		type,
		name,
		exercises,
		n_set
	}: {
		slug: string;
		type: WSetType;
		name: string;
		exercises: ExerciseInSetWorkout[];
		n_set: number;
	}) {
		this.id = new Date().getTime();
		this.slug = slug;
		this.type = type;
		this.name = name;
		this.exercises = exercises;
		this.n_set = n_set;
	}

	private validate(fields: Partial<WSetJoined>) {
		const errors: Record<string, string> = {};

		// if (!this.name) {
		// 	errors[`name`] = 'name is required';
		// }

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

	static checkFields(fields: WSetJoined) {
		new WSet(fields).validate(fields);
	}
	static async add(fields: Partial<WSet>): Promise<WSet> {
		const instance = new WSet();
		Object.assign(instance, fields); // Assign fields to the instance
		await instance.save(); // Save to the database
		return instance;
	}
}
