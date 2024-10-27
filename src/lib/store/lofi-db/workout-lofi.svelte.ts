import * as Y from 'yjs';
import type { Exercise } from '../../../types/db/exercise';
import { TypedYMap } from './typed-Ymap';
import type { WorkoutJoined } from '../../../types/db/workout';
import { IndexeddbPersistence } from 'y-indexeddb';
import { get } from 'svelte/store';

const ydoc = new Y.Doc();
const persistence = new IndexeddbPersistence('my-yjs-doc', ydoc);

// Initialize counter
export const workoutsY = ydoc.getArray<WorkoutJoined>('workouts');
export const exercisesY = ydoc.getArray<Exercise>('exercises');

async function create_app_state() {
	persistence.whenSynced.catch((error) => {
		throw new Error('IndexedDB not supported');
	});
	let _workouts = $state(workoutsY.toArray());
	let _exercises = $state(exercisesY.toArray());

	workoutsY.observeDeep(() => {
		_workouts = workoutsY.toArray();
	});
	exercisesY.observeDeep(() => {
		_exercises = exercisesY.toArray();
	});

	return {
		// for Map it was working the setter but for Array to discover yet
		// set workouts(params: Y.Array<WorkoutJoined>) {
		// 	exercisesY.('workouts', params);
		// },
		get workouts() {
			return _workouts || [];
		},
		// for Map it was working the setter but for Array to discover yet
		// set exercises(params: Y.Array<Exercise>) {
		// 	yMap.set('exercises', params);
		// },
		get exercises() {
			return _exercises || [];
		}
	};
}

export const db_state = await create_app_state();
