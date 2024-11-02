// Type for Set (unchanged from the previous diagram)
/**
 *  Workout_set is only used by one routine.
 * one to one relationship.
 *   */
export interface Workout_set {
	id: number; // primary key
	id_timer: number; // Foreign key to Timer
	id_workout: number; // Foreign key to Workout
	n_set: number;
}

/** WorkoutSet represents workout with timer. so it is Workout + timer. Flat object somehow */
export interface WorkoutSetJoined {
	id: number;
	slug: string;
	exercise_id: number;
	exercise_name: string;
	workout_type_id: number;
	exercise_description: string;
	name_workout_type: string; // tabata, hiit, reps_and_sets, ... etc
	seconds_active: number;
	seconds_rest: number;
	n_sets: number;
	created_by_id: number;
	created_by_name: string;
}
