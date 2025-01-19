// Type for Workout_type table
// TODO. RoutineBlockTypeI to be renamed to BlockTypeI
interface RoutineBlockTypeI {
	id: number; // primary key
	slug: string;
	name: string;
	image_url?: string;
	description: string;
	repeat: boolean;
	// I think it is better to be able to set the interval for each set always.
	// use_set_timer: boolean;
	/** NOTE: create also preparation interval in every set too use ex: "Are you ready for next exercise starts in x seconds... 3.2.1 Pull ups" */
	use_exercise_timer: boolean;
	// these two can make some complexity
	use_active_time: boolean;
	use_rest_time: boolean;
}
