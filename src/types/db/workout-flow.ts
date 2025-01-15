// Type for Workout_flow table
/**
 *  Workout flow is just junction table of one routine to many workout_sets
 * in runtime the workout_set's interval id can be changed by user for the flexibility. In such a case the interval is just a default value.
 */
interface WorkoutFlow {
	id: number; // primary key
	id_routine: number; // Foreign key to Routine
	id_workout_set: number; // Foreign key to Workout
}
