// Type for Workout table
export interface Workout {
	id: number; // primary key
	exercise_id: number; // Foreign key to Exercise
	created_by_id: number;
	workout_type_id: number; // Foreign key to Workout_Workout_type
}

export interface WorkoutJoined {
	id: number;
	slug: string;
	exercise_id: number;
	exercise_name: string;
	workout_type_id: number;
	exercise_description: string;
	image_url?: string;
	name_workout_type: string; // tabata, hiit, reps_and_sets, ... etc
	workout_type: 'tabata' | 'hiit' | 'reps_and_sets';
	use_active_time: boolean;
	use_rest_time: boolean;
	repeat: boolean;
	created_by_id: number;
	created_by_name: string;
}

/**
 * example
 * exercise is the smallest unit of exercise.
 *
 * can be
 * 1. wide hollow pullup
 * 2. wide arched pullup
 * 3. narrow hollow pullup
 * 4. narrow arched pullup
 * ...etc, with description
 * Workout is a exercise with type of workout.
 * example.
 * 1. wide hollow pullup amrap
 * 2. wide arched pullup HIIT
 * 3. narrow hollow pullup reps_and_sets
 * 4. narrow arched pullup  reps_and_sets
 *
 * */
