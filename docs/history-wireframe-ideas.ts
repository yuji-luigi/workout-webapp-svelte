/**
 * it should not have any ref to routine. But Routine or workouts even single timer that executed builds the record.
 * So I can think RoutineJoined is a scaffold of the record then creates the record.
 * Record is created when the timer is initialized.
 * As the timer goes, user will input reps counts for the exercise.
 * Also user can modify the weights used for the reps.
 *
 * Then the record will be hydrated by user input.
 * As timer goes, the record exercise will be updated with done.
 */
interface WorkoutHistory {
	/** Copy the name of the routine/timer/workout...etc whatever that generated the WorkoutHistory */
	id: number;
	name: string;
	duration: number;
	exercise_name: string;
	exercise_id: string;
	routine_name: string;
	routine_id: string;
	created_at: Date;
}

/** responsible to make media done time for routine/timer/workout...etc
 *
 * ex: to finish a routine it took 1 hour.
 * finishedTimer =  {
 *  time_spent: 3600,
 *  timer_executable_table_id: 1
 * }
 *
 */
interface TimeSpentForSession {
	id: number;
	/** seconds: int */
	time_spent: number;
	timer_executable_table_id: TimerExecutableTable;
}

/** responsible to determine which table is referred to by the TimeSpentForSession
 * ex: 1 => Routine
 * ex: 2 => Timer
 * ex: 3 => Workout
 */
interface TimerExecutableTable {
	id: number;
	table_name: string;
}

/**
 * 1. user choose Routine from routine page.
 * 2. user can change some parameter in the routine.
 * ex:  weight of each exercise
 *      goal_reps
 *      goal_seconds
 *      rest_time, active_time
 * 3. if user changed some parameter, app prompts user to update the routine or create duplicate or do not save at all.
 * ex: HIIT routine with 2 RoutineBlocks, each exercise has 30 seconds active_time, and 20 seconds rest_time.
 * User changes the active_time to 40 seconds, rest_time to 10 seconds.
 * App asks
 * "The routine has some changes from the original. Do you want to create new Routine out of this? or update the original? or use this routine only for this time?"
 * user can choose Update, make new routine, only for this time, back.
 *
 * 4. user choose one of options except back.
 * 5. go to timer page.
 * 6. user click start workout button.
 *    this action will create a record.
 * 7. As the timer goes, the record.time_spent will be updated in the background(I don't know how to do this but maybe with websocket or webworker).
 * 8. Even after the timer is started user can change the weight of each exercise(this does not affect the table).
 */
