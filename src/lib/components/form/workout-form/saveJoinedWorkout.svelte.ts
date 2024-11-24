import type { Exercise } from '../../../../types/db/exercise';
import type { WorkoutJoined } from '../../../../types/db/workout';
import { db_state, exercisesY, workoutsY } from '../../../store/lofi-db/workout-lofi.svelte';

export type WorkoutFormData = {
	exercise_id: any;
	exercise_description: any;
	image_url: any;
	id: number;
	exercise_name: string;
	slug: string;
	description: string;
	workout_type_name: string;
};

export function handleSaveWorkoutLocally(workoutDto: WorkoutFormData) {
	exercisesY.push([exerciseFactory(workoutDto)]);
	workoutsY.push([workoutJoinedFactory(workoutDto)]);
}

export function saveTimer(workoutDto: WorkoutFormData) {}

export function exerciseFactory(workoutDto: WorkoutFormData) {
	return {
		id: workoutDto.exercise_id,
		name: workoutDto.exercise_name,
		slug: workoutDto.slug,
		description: workoutDto.exercise_description,
		image_url: workoutDto.image_url
	};
}

export function workoutJoinedFactory(workoutDto: WorkoutFormData): WorkoutJoined {
	const { use_rest_time, use_active_time } = getWorkoutType(workoutDto.workout_type_name);
	return {
		...workoutDto,
		workout_type_id: 0,
		exercise_description: '',
		use_active_time,
		use_rest_time,
		created_by_id: 0,
		created_by_name: 'hardcoded user: TODO: get from store'
	};
}

const getWorkoutType = (workout_type: string) => {
	switch (workout_type) {
		case 'tabata':
			return { use_active_time: true, use_rest_time: true };
		case 'hiit':
			return { use_active_time: true, use_rest_time: true };
		case 'reps_and_sets':
			return { use_active_time: false, use_rest_time: false };
		default:
			return { use_active_time: false, use_rest_time: false };
	}
};
