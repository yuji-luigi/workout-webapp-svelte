import type { Exercise, ExerciseJoined } from '../../../types/db/exercise';
import type { RoutineJoined } from '../../../types/db/routine';
import type { Workout, WorkoutJoined } from '../../../types/db/workout';
import type { RoutineBlock, RoutineBlockJoined } from '../../../types/db/routine_block_interface';

const db_state_fields = ['routines', 'workouts', 'exercises'] as const;
type DBStateField = (typeof db_state_fields)[number];
const db_state_enum = {
	workout: 'workouts',
	exercise: 'exercises',
	workout_set: 'blocks',
	routine: 'routines'
} as const;

const defaultValues = {
	// TODO: Add types for these
	workoutsY: [] as any,
	exercisesY: [] as any,
	routinesY: [] as any,
	setsWorkoutY: [] as any,
	workout_set_typeY: [] as any,
	workout_set: [] as any,

	db_state_getter: {
		routine: [] as RoutineJoined[],
		workout: [] as WorkoutJoined[],
		exercise: [] as ExerciseJoined[],
		workout_set_type: [] as RoutineBlockTypeI[],
		workout_set: [] as RoutineBlockJoined[]
	},
	db_state_enum,
	db_state_fields,

	persistenceWorkoutDB: undefined,
	db_state: {
		routines: [] as RoutineJoined[],
		workouts: [] as WorkoutJoined[],
		exercises: [] as ExerciseJoined[],
		workout_set_types: [] as RoutineBlockTypeI[],
		blocks: [] as RoutineBlockJoined[]
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
	const workoutsY = ydoc.getArray<WorkoutJoined>('workouts');
	const exercisesY = ydoc.getArray<ExerciseJoined>('exercises');
	const workout_set_typeY = ydoc.getArray<RoutineBlockTypeI>('workout_set_types');
	const workout_setY = ydoc.getArray<RoutineBlockJoined>('workout_set');

	async function create_app_state() {
		persistenceWorkoutDB.whenSynced.catch((error) => {
			throw new Error('IndexedDB not supported');
		});
		let _workouts = $state(workoutsY.toArray());
		let _exercises = $state(exercisesY.toArray());
		let _routines = $state(routinesY.toArray());
		let _workout_set_types = $state(workout_set_typeY.toArray());
		let _blocks = $state(workout_setY.toArray());

		workoutsY.observeDeep(() => {
			_workouts = workoutsY.toArray();
		});
		exercisesY.observeDeep(() => {
			_exercises = exercisesY.toArray();
		});
		routinesY.observeDeep(() => {
			_routines = routinesY.toArray();
		});
		workout_setY.observeDeep(() => {
			_blocks = workout_setY.toArray();
		});
		workout_set_typeY.observeDeep(() => {
			_workout_set_types = workout_set_typeY.toArray();
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
			get blocks() {
				return _blocks || [];
			},
			get workout_set_types() {
				return _workout_set_types || [];
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
		get workout_set() {
			return db_state.blocks;
		},
		get workout_set_type() {
			return db_state.workout_set_types;
		}
	} as const;

	return {
		exercisesY,
		workoutsY,
		routinesY,
		workout_set_typeY,
		db_state_getter,
		db_state_enum,
		db_state,
		db_state_fields,
		persistenceWorkoutDB
	};
}

export const lofi_db = await create_lofi_db();
