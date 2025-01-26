import type { ExerciseJoined } from '../../types/db/exercise';
import type { RoutineJoined } from '../../types/db/routine';
import type { RoutineBlockJoined } from '../../types/db/routine_block_interface';
import type { WorkoutJoined } from '../../types/db/workout';
import { db } from './dexie-db/dexie-db';

export const tableStates: {
	exercises: ExerciseJoined[];
	workouts: WorkoutJoined[];
	workout_sets: RoutineBlockJoined[];
	workout_set_types: RoutineBlockTypeI[];
	routines: RoutineJoined[];
} = $state({
	exercises: [],
	workouts: [],
	workout_sets: [],
	workout_set_types: [],
	routines: []
});

export const initTables = async () => {
	tableStates.exercises = await db.exercise.toArray();
	tableStates.workouts = await db.workout.toArray();
	tableStates.workout_sets = await db.workout_set.toArray();
	tableStates.workout_set_types = await db.workout_set_type.toArray();
	tableStates.routines = await db.routine.toArray();
};

export const refreshTable = async (table: keyof typeof db) => {
	tableStates[table] = await db[table].toArray();
};
