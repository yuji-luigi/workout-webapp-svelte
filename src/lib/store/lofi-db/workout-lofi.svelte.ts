import type { Exercise } from '../../../types/db/exercise';
import type { RoutineJoined } from '../../../types/db/routine';
import type { Workout } from '../../../types/db/workout';

const db_state_fields = ['routines', 'workouts', 'exercises'] as const;
type DBStateField = (typeof db_state_fields)[number];
const db_state_enum = {
	workout: 'workouts',
	exercise: 'exercises',
	routine: 'routines'
} as const;

const defaultValues = {
	// TODO: Add types for these
	workoutsY: [] as any,
	exercisesY: [] as any,
	routinesY: [] as any,
	workout_typeY: [] as any,

	db_state_getter: {
		routine: [],
		workout: [],
		exercise: [],
		workout_type: []
	},
	db_state_enum,
	db_state_fields,

	persistenceWorkoutDB: undefined,
	db_state: {
		routines: [],
		workouts: [],
		exercises: [],
		workout_types: []
	}
};

async function create_lofi_db() {
	if (typeof window === 'undefined') {
		return defaultValues;
	}
	const { IndexeddbPersistence } = await import('y-indexeddb');
	const Y = await import('yjs');

	const ydoc = new Y.Doc();
	const persistenceWorkoutDB = new IndexeddbPersistence('my-yjs-doc', ydoc);

	// Initialize counter
	const routinesY = ydoc.getArray<RoutineJoined>('routines');
	const workoutsY = ydoc.getArray<Workout>('workouts');
	const exercisesY = ydoc.getArray<Exercise>('exercises');
	const workout_typeY = ydoc.getArray<WorkoutType>('workout_types');

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

	const db_state = await create_app_state();

	const db_state_getter = {
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
	} as const;

	return {
		exercisesY,
		workoutsY,
		routinesY,
		workout_typeY,
		db_state_getter,
		db_state_enum,
		db_state,
		db_state_fields,
		persistenceWorkoutDB
	};
}

export const lofi_db = await create_lofi_db();
