// Type for Workout_type table
interface WSetTypeI {
	id: number; // primary key
	slug: string;
	name: string;
	image_url?: string;
	description: string;
	repeat: boolean;
	// I think it is better to be able to set the timer for each set always.
	// use_set_timer: boolean;
	use_exercise_timer: boolean;
	// these two can make some complexity
	use_active_time: boolean;
	use_rest_time: boolean;
}
