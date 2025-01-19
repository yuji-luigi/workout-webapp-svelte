// Type for Set (unchanged from the previous diagram)

import type { ExerciseInRoutineJoined } from './exercise';
import type { Interval } from './interval';

/**
 *  WSet is only used by one routine.
 * one to one relationship.
 *   */
// export interface WSet {
// 	id: number; // primary key
// 	// id_timer: number; // Foreign key to Interval
// 	// id_workout: number; // Foreign key to Workout
// 	n_set: number;
// 	exercises: ExerciseInRoutineJoined[];
// }

/** WSet represents workout with interval. so it is Workout + interval. Flat object somehow */
//TODO: Set naming to Block
export interface WSetJoined {
	id?: number;
	slug: string;
	type: WSetTypeI;
	/** type of set + exercise name concatenated */
	name: string;
	/** there is no UI to set descriptions for now. */
	description?: string;
	/** not simple exercise. it may have rest/active_time */
	exercises: ExerciseInRoutineJoined[];
	n_set: number;
	interval?: Interval;
	// set_rest_time?: number;
	// set_active_time?: number;
}
