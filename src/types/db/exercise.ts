import type { FileDB } from './file-db';
import type { Interval } from './interval';

/**
 * Primitive collection (no join needed)
 * GLOBALLY create exercise with name REST.
 * collection name is exercise but for commodity ue also REST as exercise.
 * */
export interface Exercise {
	id?: number; // primary key
	name: string; // Foreign key to Interval
	slug: string;
	description?: string;
	image?: FileDB | number | File;
}

export interface ExerciseJoined extends Exercise {
	created_by_id?: number;
	created_by_name?: string;
}

export interface ExerciseInSetWorkout extends ExerciseJoined {
	interval?: Interval;
}
