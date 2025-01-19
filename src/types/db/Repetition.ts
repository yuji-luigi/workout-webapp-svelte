// is used in ExerciseInRoutineJoined
// one to one relationship with exercise or exercise_in_history
export interface Repetition {
	id?: number;
	count?: number;
	seconds_static_hold?: number; // represents the hold seconds for the reps
	// if only one value is provided, then it is a range.
	rpe_from?: number;
	rpe_to?: number;
}
