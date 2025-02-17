import type { ExerciseInRoutineJoined } from '../../../../types/db/exercise';
import type { FileDB } from '../../../../types/db/file-db';
import type { Interval } from '../../../../types/db/interval';
import type { Repetition } from '../../../../types/db/Repetition';
import type { WeightJoined } from '../../../../types/db/weight';
import { ValidationError } from '../../../errors/validation-error';
import { db } from '../dexie-db';

export class Exercise implements ExerciseInRoutineJoined {
	interval?: Interval | undefined;
	repetition: Repetition;
	weight?: WeightJoined | undefined;
	video?: number | FileDB | File | undefined;
	created_by_id: number;
	created_by_name?: string | undefined;
	description?: string;
	image?: number | FileDB | File | undefined;
	id: number;
	name: string;

	slug: string;
	rest_time?: number;
	active_time?: number;
	videoSrc?: string;
	constructor(fields: ExerciseInRoutineJoined) {
		const {
			interval = {
				rest_time: 0,
				active_time: 0,
				id: 0
			},
			repetition = {
				count: 0,
				id: 0
			},
			weight = {
				weight: 0,
				weight_type: {
					id: 0,
					name: '',
					description: ''
				}
			},
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
		this.image = image;
		this.id = id;
		this.name = name;
		this.slug = slug;
		this.videoSrc = videoSrc;
	}

	save() {
		return db.exercise.put(this);
	}

	static validate(fields: Partial<ExerciseInRoutineJoined>) {
		const errors: Record<string, string> = {};
		if (!fields.name) {
			errors[`name`] = 'Name is required';
		}
		if (!fields.repetition) {
			errors[`repetition`] = 'Repetition is required';
		}
		if (!fields.weight) {
			errors[`weight`] = 'Weight is required';
		}

		if (Object.keys(errors).length) {
			throw new ValidationError(errors);
		}
		return true;
	}
}
