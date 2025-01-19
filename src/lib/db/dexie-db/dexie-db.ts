// db.ts
import Dexie, { type Table } from 'dexie';
import type { ExerciseInRoutineJoined } from '$types/db/exercise';
import type { FileDB } from '$types/db/file-db';
import type { WSetJoined } from '$types/db/WSetI';
import type { WorkoutJoined } from '$types/db/workout';
import type { User } from '$types/db/user'; // If you have a separate type
import type { RoutineJoined } from '../../../types/db/routine';
import type { Collection } from '../../../types/db/collections';
import type { IDOptional } from '../../../types/util-types/setOptional';

class WorkoutDatabase extends Dexie {
	// Actual table properties
	workouts!: Table<WorkoutJoined, number, Omit<WorkoutJoined, 'id'>>;
	routines!: Table<RoutineJoined, number, Omit<RoutineJoined, 'id'>>;
	workout_sets!: Table<WSetJoined, number, Omit<WSetJoined, 'id'>>;
	workout_set_types!: Table<WSetTypeI, number, Omit<WSetTypeI, 'id'>>;
	exercises!: Table<ExerciseInRoutineJoined, number, Omit<ExerciseInRoutineJoined, 'id'>>;
	users!: Table<User, number, Omit<User, 'id'>>;
	files!: Table<FileDB, number, Omit<FileDB, 'id'>>;

	// ALIASES (getters)
	get routine() {
		return this.routines;
	}
	get workout() {
		return this.workouts;
	}
	get exercise() {
		return this.exercises;
	}

	get workout_set() {
		return this.workout_sets;
	}
	get workout_set_type() {
		return this.workout_set_types;
	}

	get user() {
		return this.users;
	}
	get file() {
		return this.files;
	}

	// Add more aliases as needed...

	constructor() {
		super('WorkoutDatabase');

		this.version(1).stores({
			workouts: '++id, slug, type, name, sets',
			routines: '++id, slug, name, image, workouts, description, created_at, updated_at', // Updated from empty string
			workout_sets: '++id, slug, type, name, n_set',
			workout_set_types:
				'++id, slug, name, repeat, use_active_time, use_rest_time, description, use_exercise_timer, use_set_timer',
			exercises: '++id, name, slug, rest_time, active_time, description, image',
			users: '++id, name, suname, address, birth_date, locale',
			files: '++id, name, slug, description, src, full_path, parent_collection'
		});
	}
}

export const db = new WorkoutDatabase();

type Tables = (typeof db)['exercises'];

// TableNameMap.ts (or in the same file)

// Maps the string name of each table to its row type:
export interface TableRowMap {
	workouts: WorkoutJoined;
	routines: RoutineJoined;
	workout_sets: WSetJoined;
	workout_set_types: WSetTypeI;
	exercises: ExerciseInRoutineJoined;
	users: User;
	files: FileDB;
}
