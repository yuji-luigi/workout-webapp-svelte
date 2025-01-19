import type { User } from './user';
import type { Workout } from './workout';
import type { RoutineBlockJoined } from './routine_block_interface';

// Type for Routine table
export interface Routine {
	id?: number; // primary key
	slug: string;
	name: string;
	description: string;
	image?: string;
	created_by_id: number | string;
}

export interface RoutineJoined extends Routine {
	id: number; // primary key
	slug: string;
	name: string;
	description: string;
	image?: string;
	// joined by workout_flow many to many relationship
	// TODO: blocks to be workout_blocks
	blocks: RoutineBlockJoined[];
	created_by: User;
}
