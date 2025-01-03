import type { ExerciseJoined } from '../../../../../types/db/exercise';
import type { WSet, WSetJoined } from '../../../../../types/db/WSetI';
import type { WorkoutFormPayload } from '../../../../data/template-json/dataTable/workouts-form-table-json';
import { db } from '../../../../db/dexie-db/dexie-db';
// import { lofi_db } from '../../../../db/lofi-yjs-db/lofi_db.svelte';

export function workoutDtoFactory(payload: WorkoutFormPayload) {
	const setFactory = new SetWorkoutFactory();
	const sets = setFactory.fromWorkoutFormPayload(payload);
	return null;
}

class SetWorkoutFactory {
	private wSet: WSetJoined[];
	constructor() {
		this.wSet = db.workout_set || [];
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
