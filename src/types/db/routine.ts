import type { WorkoutSetJoined } from './workout-set';

// Type for Routine table
export interface Routine {
	id: number; // primary key
	slug: string;
	name: string;
	description: string;
	image?: string;
}

export interface RoutineJoined extends Routine {
	name: string;
	description: string;
	sets: WorkoutSetJoined[];
	image_url?: string;
}
