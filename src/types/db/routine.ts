import type { Workout } from './workout';
import type { WSetJoined } from './WSetI';

// Type for Routine table
export interface Routine {
	id?: number; // primary key
	slug: string;
	name: string;
	description: string;
	image?: string;
	created_by: number | string;
}

export interface RoutineJoined extends Routine {
	id: number; // primary key
	slug: string;
	name: string;
	description: string;
	image?: string;
	// joined by workout_flow many to many relationship
	// TODO: workout_sets to be workout_blocks
	workout_sets: WSetJoined[];
}
