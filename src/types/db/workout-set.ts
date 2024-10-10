// Type for Set (unchanged from the previous diagram)
interface Workout_set {
	id: number; // primary key
	id_timer: number; // Foreign key to Timer
	id_workout: number; // Foreign key to Workout
}
