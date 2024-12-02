import * as Y from 'yjs';
import type { Exercise, ExerciseJoined } from '../../../types/db/exercise';
import { TypedYMap } from './typed-Ymap';
import { IndexeddbPersistence } from 'y-indexeddb';
import { get } from 'svelte/store';
import type { Collection } from '../../../types/db/collections';
import type { RoutineJoined } from '../../../types/db/routine';

export const db_state_fields = ['routines', 'workouts', 'exercises'] as const;

export const db_state_enum = {
	workout: 'workouts',
	exercise: 'exercises',
	routine: 'routines'
} as const;

export type DBStateField = (typeof db_state_fields)[number];

const ydoc = new Y.Doc();
export const persistenceWorkoutDB = new IndexeddbPersistence('my-yjs-doc', ydoc);

// Initialize counter
export const routinesY = ydoc.getArray<RoutineJoined>('routines');
export const workoutsY = ydoc.getArray<ExerciseJoined>('workouts');
export const exercisesY = ydoc.getArray<Exercise>('exercises');
export const workout_typeY = ydoc.getArray<WorkoutType>('workout_types');

async function create_app_state() {
	persistenceWorkoutDB.whenSynced.catch((error) => {
		throw new Error('IndexedDB not supported');
	});
	let _workouts = $state(workoutsY.toArray());
	let _exercises = $state(exercisesY.toArray());
	let _routines = $state(routinesY.toArray());
	let _workout_types = $state(workout_typeY.toArray());

	workoutsY.observeDeep(() => {
		_workouts = workoutsY.toArray();
	});
	exercisesY.observeDeep(() => {
		_exercises = exercisesY.toArray();
	});
	routinesY.observeDeep(() => {
		_routines = routinesY.toArray();
	});
	workout_typeY.observeDeep(() => {
		_workout_types = workout_typeY.toArray();
	});

	return {
		get routines() {
			return _routines || [];
		},
		get workouts() {
			return _workouts || [];
		},

		get exercises() {
			return _exercises || [];
		},
		get workout_types() {
			return _workout_types || [];
		}
	};
}

export const db_state = await create_app_state();

export const db_state_getter = {
	get routine() {
		return db_state.routines;
	},
	get workout() {
		return db_state.workouts;
	},
	get exercise() {
		return db_state.exercises;
	},
	get workout_type() {
		return db_state.workout_types;
	}
};
