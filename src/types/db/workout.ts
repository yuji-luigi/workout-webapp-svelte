import type { RoutineBlock } from '../../lib/db/dexie-db/RoutineBlock';
import type { ExerciseJoined } from './exercise';
import type { FileDB } from './file-db';

/** workout is a joined exercises with interval config.
 *
 */
export interface Workout {
	id: number | string; // primary key
	name: string;
	slug: string;
	description: string;
	tag: string;
	type: RoutineBlockTypeI;
	// description: string;
	// image: FileDB;
	/**
	 * you can set interval values whether here or exercise level. not both.
	 * get rest_time and active_time from here and set to each exercise, in iteration set if rest_time and active_time in exercise or workout level to handle priority.
	 * */
	rest_time?: number;
	active_time?: number;
	/** usually one exercise but user can customize workout to be one super-set or big-set or etc. */
	sets: RoutineBlock[];
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
 *  rest_time: 30,
 *  active_time: 30,
 *  n_sets: 3,
 *  rpe_target: 10,
 *  rep_range: 8-12
 * },
 * ]
 */
