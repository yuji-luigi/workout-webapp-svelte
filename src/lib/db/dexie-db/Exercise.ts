import type { ExerciseInRoutineJoined } from '../../../types/db/exercise';
import type { FileDB } from '../../../types/db/file-db';
import { db } from './dexie-db';

export class Exercise implements ExerciseInRoutineJoined {
	created_by_id?: number | undefined;
	created_by_name?: string | undefined;
	description?: string;
	image?: number | FileDB | File | undefined;
	id!: number;
	name!: string;
	slug!: string;
	rest_time?: number;
	active_time?: number;
	videoSrc?: string;

	save() {
		return db.exercise.put(this);
	}

	static async add(fields: Partial<Exercise>): Promise<Exercise> {
		const instance = new Exercise();
		Object.assign(instance, fields);
		await instance.save();
		return instance;
	}
}
