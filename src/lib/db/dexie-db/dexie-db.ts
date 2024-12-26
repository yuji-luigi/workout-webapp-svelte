// db.ts
import Dexie, { type Table } from 'dexie';
import type { ExerciseInSetWorkout } from '$types/db/exercise';
import type { FileDB } from '$types/db/file-db';
import type { WSetJoined } from '$types/db/WSetI';
import type { WorkoutJoined } from '$types/db/workout';
import type { User } from '$types/db/user'; // If you have a separate type
import type { RoutineJoined } from '../../../types/db/routine';
import type { Collection } from '../../../types/db/collections';

class WorkoutDatabase extends Dexie {
	// Actual table properties
	workouts!: Table<WorkoutJoined, number>;
	routines!: Table<RoutineJoined, number>;
	workout_sets!: Table<WSetJoined, number>;
	workout_set_types!: Table<WSetTypeI, number>;
	exercises!: Table<ExerciseInSetWorkout, number>;
	users!: Table<User, number>;
	files!: Table<FileDB, number>;

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
				'++id, slug, name, repeat, use_active_time, use_rest_time, description, has_timer_per_exercise',
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
	exercises: ExerciseInSetWorkout;
	users: User;
	files: FileDB;
}
