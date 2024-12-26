import type { Exercise, ExerciseJoined } from '$types/db/exercise';
import { db } from '../../../../db/dexie-db/dexie-db';

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
const { exercises: exercisesY, workouts: workoutsY } = db || {};
export function handleSaveWorkoutLocally(workoutDto: WorkoutFormData) {
	if (!exercisesY || !workoutsY) return;
	exercisesY.add(exerciseFactory(workoutDto));
	workoutsY.add(workoutJoinedFactory(workoutDto) as any);
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

export function workoutJoinedFactory(workoutDto: WorkoutFormData): ExerciseJoined {
	const { use_rest_time, use_active_time } = getWorkoutType(workoutDto.workout_type_name);
	return {
		...workoutDto,
		workout_type_id: 0,
		description: '',
		use_active_time,
		use_rest_time,
		created_by_id: 0,
		created_by_name: 'hardcoded user: TODO: get from store'
	};
}

const getWorkoutType = (workout_set_type: string) => {
	switch (workout_set_type) {
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
