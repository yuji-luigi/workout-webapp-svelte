// Type for Workout_type table
interface WSetTypeI {
	id: number; // primary key
	slug: string;
	name: string;
	image_url?: string;
	description: string;
	repeat: boolean;
	has_timer_per_exercise: boolean;
	// these two can make some complexity
	use_active_time: boolean;
	use_rest_time: boolean;
}
