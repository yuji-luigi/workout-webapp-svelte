import type { WorkoutJoined } from './workout';

// Type for Routine table
interface Routine {
	id: number; // primary key
	slug: string;
	name: string;
	description: string;
	image?: string;
}

interface RoutineJoined extends Routine {
	name: string;
	description: string;
	image_url;
	workouts: WorkoutJoined[];
}
