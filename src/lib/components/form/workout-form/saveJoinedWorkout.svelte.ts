import type { Exercise } from '../../../../types/db/exercise';
import type { WorkoutJoined } from '../../../../types/db/workout';
import { db_state, exercisesY, workoutsY } from '../../../store/lofi-db/workout-lofi.svelte';

export type WorkoutFormData = {
	exercise_name: string;
	slug: string;
	description: string;
	workout_type_id: number;
	timer_seconds_rest: number;
	timer_seconds_active: number;
};

export function handleSaveWorkoutLocally(workoutDto: WorkoutJoined) {
	exercisesY.push([exerciseFactory(workoutDto)]);
	workoutsY.push([workoutDto]);
}

export function saveTimer(workoutDto: WorkoutJoined) {}

export function exerciseFactory(workoutDto: WorkoutJoined) {
	return {
		id: workoutDto.exercise_id,
		name: workoutDto.exercise_name,
		slug: workoutDto.slug,
		description: workoutDto.exercise_description
	};
}
