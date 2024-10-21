// Type for Workout table
export interface Workout {
	id: number; // primary key
	id_exercise: number; // Foreign key to Exercise
	id_created_by: number;
	id_workout_type: number; // Foreign key to Workout_Workout_type
}

export interface WorkoutJoined {
	id: number;
	slug: string;
	id_exercise: number;
	id_workout_type: number;
	name_exercise: string;
	description_exercise: string;
	name_workout_type: string; // tabata, hiit, reps_and_sets, ... etc
	name: string;
	workout_type: string;
	id_created_by: number;
	name_created_by: string;
}
