// Type for Workout table
export interface Workout {
	id: number; // primary key
	id_exercise: number; // Foreign key to Exercise
	created_by: number;
	id_workout_type: number; // Foreign key to Workout_Workout_type
}
