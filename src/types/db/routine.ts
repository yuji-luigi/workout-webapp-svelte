import type { Workout } from './workout';
import type { WSetJoined } from './workout-set';

// Type for Routine table
export interface Routine {
	id: number; // primary key
	slug: string;
	name: string;
	description: string;
	image?: string;
	workouts: Workout[];
	created_by: number | string;
}

export interface RoutineJoined extends Routine {
	id: number; // primary key
	slug: string;
	name: string;
	description: string;
	image?: string;
	workouts: Workout[];
	created_by: number | string;
}
