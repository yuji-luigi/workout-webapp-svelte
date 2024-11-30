import type { Exercise, ExerciseJoined } from '../../../../types/db/exercise';
import { db_state, exercisesY, workoutsY } from '../../../store/lofi-db/workout-lofi.svelte';

export type WorkoutFormData = {
	exercise_id: any;
	exercise_description: any;
	image_url: any;
	id: number;
	exercise_name: string;
	slug: string;
	description: string;
	workout_type: WorkoutType;
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

/** workoutDto has exercise and workout_type */
export function workoutJoinedFactory(workoutDto: WorkoutFormData): ExerciseJoined {
	const { use_rest_time, use_active_time, name: workout_type_name } = workoutDto.workout_type;
	const name = `${workoutDto.exercise_name} - ${workout_type_name}`;
	return {
		...workoutDto,
		name,
		exercise_description: '',
		use_active_time,
		use_rest_time,
		workout_type_name,
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
			return { use_active_time: false, use_rest_time: true };
		default:
			return { use_active_time: false, use_rest_time: false };
	}
};
