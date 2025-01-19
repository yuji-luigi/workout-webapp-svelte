// db.ts
import Dexie, { type Table } from 'dexie';
import type { ExerciseJoined } from '$types/db/exercise';
import type { FileDB } from '$types/db/file-db';
import type { RoutineBlockJoined } from '$types/db/routine_block_interface';
import type { WorkoutJoined } from '$types/db/workout';
import type { User } from '$types/db/user'; // If you have a separate type
import type { RoutineJoined } from '../../../types/db/routine';
import type { Collection } from '../../../types/db/collections';
import type { IDOptional } from '../../../types/util-types/setOptional';

class WorkoutDatabase extends Dexie {
	// Actual table properties
	workouts!: Table<WorkoutJoined, number, Omit<WorkoutJoined, 'id'>>;
	routines!: Table<RoutineJoined, number, Omit<RoutineJoined, 'id'>>;
	blocks!: Table<RoutineBlockJoined, number, Omit<RoutineBlockJoined, 'id'>>;
	workout_set_types!: Table<RoutineBlockTypeI, number, Omit<RoutineBlockTypeI, 'id'>>;
	exercises!: Table<ExerciseJoined, number, Omit<ExerciseJoined, 'id'>>;
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
		return this.blocks;
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
			blocks: '++id, slug, type, name, n_set',
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
	blocks: RoutineBlockJoined;
	workout_set_types: RoutineBlockTypeI;
	exercises: ExerciseJoined;
	users: User;
	files: FileDB;
}
