import type { ExerciseJoined } from './exercise';

// Type for Workout table
// workout has list of exercises with timer values.
export interface Workout {
	id: number; // primary key
	name: string;
	type: WorkoutType;
	exercises: (ExerciseJoined & {
		seconds_rest: number;
		seconds_active: number;
		rpe: number;
		n_sets: number;
		rep_range: string;
	})[];
	created_by_id: number;
}
/**
 * HIIT WORKOUT
 * name: hiit pull workout
 * type: hiit
 * exercises: [
 * {
 *  id: 1,
 *  name: 'pull up',
 *  seconds_rest: 30,
 *  seconds_active: 30,
 *  n_sets: 3,
 *  rpe_target: 10,
 *  rep_range: 8-12
 * },
 * ]
 */
