// Type for Workout_type table
interface WSetType {
	id: number; // primary key
	slug: string;
	name: string;
	image_url?: string;
	description: string;
	repeat: boolean;
	// these two can make some complexity
	use_active_time: boolean;
	use_rest_time: boolean;
}
