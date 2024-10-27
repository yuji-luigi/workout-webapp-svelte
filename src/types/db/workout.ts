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
	name_workout_type: string; // tabata, hiit, reps_and_sets, ... etc
	workout_type: string;
	repeat: boolean;
	useActiveTime: boolean;
	useRestTime: boolean;
	created_by_id: number;
	created_by_name: string;
}
