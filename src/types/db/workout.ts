import type { ExerciseJoined } from './exercise';
import type { FileDB } from './file-db';

/** workout is a joined exercises with timer config.
 *
 */
export interface Workout {
	id: number | string; // primary key
	name: string;
	slug: string;
	type: WorkoutType;
	// description: string;
	// image: FileDB;
	/**
	 * you can set timer values whether here or exercise level. not both.
	 * get seconds_rest and seconds_active from here and set to each exercise, in iteration set if seconds_rest and seconds_active in exercise or workout level to handle priority.
	 * */
	seconds_rest?: number;
	seconds_active?: number;
	/** usually one exercise but user can customize workout to be one super-set or big-set or etc. */
	exercises: (ExerciseJoined & {
		seconds_rest: number;
		seconds_active: number;
		rpe: number;
		n_sets: number;
		rep_range: string;
	})[];
	created_by: number;
}

export interface WorkoutJoined extends Workout {
	created_by_name: string;
}
/**
 * HIIT WORKOUT
 * name: hiit pull workout
 * type: hiit
 * exercises: [
 * {
 *  id: 1,
 *  name: 'pull up',
 *  seconds_rest: 30,
 *  seconds_active: 30,
 *  n_sets: 3,
 *  rpe_target: 10,
 *  rep_range: 8-12
 * },
 * ]
 */
