// Type for Workout_flow table
interface WorkoutFlow {
	id_routine: number; // Foreign key to Routine
	id_set: number; // Foreign key to Workout
}
