// Type for Set (unchanged from the previous diagram)

import type { ExerciseInSetWorkout, ExerciseJoined } from './exercise';

/**
 *  WorkoutSet is only used by one routine.
 * one to one relationship.
 *   */
export interface WorkoutSet {
	id: number; // primary key
	// id_timer: number; // Foreign key to Timer
	// id_workout: number; // Foreign key to Workout
	n_set: number;
	exercises: ExerciseInSetWorkout[];
}

/** WorkoutSet represents workout with timer. so it is Workout + timer. Flat object somehow */
export interface WorkoutSetJoined {
	id: number;
	slug: string;
	type: string;
	/** type of set + exercise name concatenated */
	name: string;
	/** there is no UI to set descriptions for now. */
	description?: string;
	/** not simple exercise. it may have rest/active_time */
	exercises: ExerciseInSetWorkout[];
	n_set: number;
}
