// Type for Workout_Workout_type table (junction table)
export interface Workout__Workout_type {
	id: number; // primary key
	id_workout: number; // Foreign key to Workout
	workout_type_id: number; // Foreign key to Workout type
}
