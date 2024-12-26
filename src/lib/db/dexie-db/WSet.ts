import type { ExerciseInSetWorkout } from '../../../types/db/exercise';
import { db } from './dexie-db';
import type { WSetType } from './WSetType';

class WSet {
	id!: number;
	slug!: string;
	type!: WSetType;
	name!: string;
	exercises!: ExerciseInSetWorkout[];
	n_set!: number;

	save() {
		return db.wSet.put(this);
	}

	static async add(fields: Partial<WSet>): Promise<WSet> {
		const instance = new WSet();
		Object.assign(instance, fields); // Assign fields to the instance
		await instance.save(); // Save to the database
		return instance;
	}
}
