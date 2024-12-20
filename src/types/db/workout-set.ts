// Type for Set (unchanged from the previous diagram)

import type { workout_set_type } from '../../lib/components/form/form-by-collection';
import type { ExerciseInSetWorkout, ExerciseJoined } from './exercise';

/**
 *  WSet is only used by one routine.
 * one to one relationship.
 *   */
export interface WSet {
	id: number; // primary key
	// id_timer: number; // Foreign key to Timer
	// id_workout: number; // Foreign key to Workout
	n_set: number;
	exercises: ExerciseInSetWorkout[];
}

/** WSet represents workout with timer. so it is Workout + timer. Flat object somehow */
export interface WSetJoined {
	id: number;
	slug: string;
	type: WSetType;
	/** type of set + exercise name concatenated */
	name: string;
	/** there is no UI to set descriptions for now. */
	description?: string;
	/** not simple exercise. it may have rest/active_time */
	exercises: ExerciseInSetWorkout[];
	n_set: number;
}
