import type { ExerciseInRoutineJoined } from '../../../../types/db/exercise';
import type { FileDB } from '../../../../types/db/file-db';
import type { Interval } from '../../../../types/db/interval';
import type { Repetition } from '../../../../types/db/Repetition';
import type { WeightJoined } from '../../../../types/db/weight';
import { db } from '../dexie-db';

export class ExerciseDexie implements ExerciseInRoutineJoined {
	interval?: Interval | undefined;
	repetition: Repetition;
	weight?: WeightJoined | undefined;
	video?: number | FileDB | File | undefined;
	created_by_id: number;
	created_by_name?: string | undefined;
	description?: string;
	image?: number | FileDB | File | undefined;
	id!: number;
	name!: string;
	slug!: string;
	rest_time?: number;
	active_time?: number;
	videoSrc?: string;
	constructor(fields: ExerciseInRoutineJoined) {
		const {
			interval,
			repetition,
			weight,
			video,
			created_by_id,
			description,
			image,
			id,
			name,
			slug,
			videoSrc
		} = fields;
		this.interval = interval;
		this.repetition = repetition;
		this.weight = weight;
		this.video = video;
		this.created_by_id = created_by_id;
		this.created_by_name = 'xx_created_by_name';
		this.description = description;
	}

	save() {
		return db.exercise.put(this);
	}

	private validate() {
		const errors: Record<string, string> = {};
		if (!this.name) {
			errors[`name`] = 'Name is required';
		}
		if (!this.repetition) {
			errors[`repetition`] = 'Repetition is required';
		}
		if (!this.weight) {
			errors[`weight_id`] = 'Weight is required';
		}
	}

	static async add(fields: Partial<Exercise>): Promise<Exercise> {
		const instance = new Exercise({});
		Object.assign(instance, fields);
		await instance.save();
		return instance;
	}
}
