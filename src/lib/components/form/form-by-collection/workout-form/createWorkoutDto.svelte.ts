import type { ExerciseJoined } from '../../../../../types/db/exercise';
import type { WSet, WSetJoined } from '../../../../../types/db/workout-set';
import type { WorkoutFormPayload } from '../../../../data/template-json/dataTable/workouts-form-table-json';
import { lofi_db } from '../../../../store/lofi-db/lofi_db.svelte';

export function workoutDtoFactory(payload: WorkoutFormPayload) {
	const setFactory = new SetWorkoutFactory();
	const sets = setFactory.fromWorkoutFormPayload(payload);
	return null;
}

class SetWorkoutFactory {
	private wSet: WSetJoined[];
	constructor() {
		this.wSet = lofi_db.db_state_getter.workout_set || [];
	}

	fromWorkoutFormPayload(formData: WorkoutFormPayload): WSetJoined[] {
		return [];
		// return formData.exercises.map((exercise) => {
		// 	const id = this.wSet.length + 1;
		// 	const name = `  ${exercise.name}`;
		// 	return {
		// 		id,
		// 		slug: '',
		// 		name: '',
		// 		exercises: [],
		// 		n_set: 0
		// 	};
		// });
	}
}
