import type { Exercise, ExerciseJoined } from '../../../types/db/exercise';
import type { RoutineJoined } from '../../../types/db/routine';
import type { Workout, WorkoutJoined } from '../../../types/db/workout';
import type { WSet, WSetJoined } from '../../../types/db/WSetI';
import { db } from './dexie-db';

const db_state_fields = ['routines', 'workouts', 'exercises'] as const;
type DBStateField = (typeof db_state_fields)[number];
const db_state_enum = {
	workout: 'workouts',
	exercise: 'exercises',
	workout_set: 'workout_sets',
	routine: 'routines'
} as const;

function create_dexie_adaptor() {
	return {
		workouts() {
			return db.wSet;
		},
		routines() {
			return db.wSet;
		},

		exercises() {
			return db.exercise;
		},
		workout_sets() {
			return db.wSet;
		},
		workout_set_types() {
			return db.workout_set_type || [];
		}
	};
}

export const dexie_db = create_dexie_adaptor();
