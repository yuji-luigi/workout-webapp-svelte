// Type for Workout_flow table
interface WorkoutFlow {
	id: number; // primary key
	id_routine: number; // Foreign key to Routine
	id_workout_set: number; // Foreign key to Workout
}
