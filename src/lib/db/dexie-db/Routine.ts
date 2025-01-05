import type { ExerciseInSetWorkout } from '../../../types/db/exercise';
import type { RoutineJoined } from '../../../types/db/routine';
import type { Workout } from '../../../types/db/workout';
import type { WSetJoined } from '../../../types/db/WSetI';
import { hasId } from '../../../types/util-types/hasID';
import type { SetOptional } from '../../../types/util-types/setOptional';
import { ValidationError } from '../../errors/validation-error';
import { db } from './dexie-db';
import { WSet } from './WSet';

export class Routine implements RoutineJoined {
	id: number;
	slug: string;
	name: string;
	description: string;
	image?: string | undefined;
	workout_sets: WSetJoined[];
	created_by: string | number;

	constructor({
		slug,
		name,
		description,
		workout_sets,
		created_by
	}: {
		slug: string;
		name: string;
		description: string;
		workout_sets: WSetJoined[];
		created_by: string | number;
	}) {
		/** id is created for temporal purpose. before creation of the record it will be set to undefined to get the auto inc-ID */
		this.id = new Date().getTime();
		this.slug = slug;
		this.name = name;
		this.description = description;
		this.workout_sets = workout_sets;
		this.created_by = created_by;
	}

	private validate(fields: Partial<Routine>) {
		const errors: Record<string, string> = {};
		if (!fields.name) {
			errors['name'] = 'Name is required';
		}
		if (!fields.slug) {
			errors['slug'] = 'Slug is required';
		}
		if (!fields.description) {
			errors['description'] = 'Description is required';
		}
		if (!fields.workout_sets) {
			errors['workout_sets'] = 'Workout sets are required';
		}

		if (fields.workout_sets?.length) {
			fields.workout_sets.forEach((workoutSet, index) => {
				try {
					WSet.checkFields(workoutSet);
				} catch (error: any) {
					errors[`workout_sets[${index}]`] = error.message;
				}
			});
		}
		if (Object.keys(errors).length) {
			throw new ValidationError(errors);
		}
		return true;
	}

	async create() {}
	async save() {
		if (hasId(this)) {
			return db.routines.put(this);
		}
	}

	static async add(fields: Omit<RoutineJoined, 'id'>): Promise<RoutineJoined> {
		const instance = new Routine(fields);
		// 2. Validate. If invalid, it throws ValidationError
		instance.validate(fields);
		const newID = await db.routines.add({
			...instance,
			// id should be undefined to get the auto-incremented id from the db
			// @ts-ignore
			id: undefined
		});
		instance.id = newID;
		return instance;
	}
}
