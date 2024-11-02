// Type for Workout_type table
interface WorkoutType {
	id: number; // primary key
	slug: string;
	name: string;
	image_url?: string;
	description: string;
	repeat: boolean;
	// these two can make some complexity
	useActiveTime: boolean;
	useRestTime: boolean;
}
