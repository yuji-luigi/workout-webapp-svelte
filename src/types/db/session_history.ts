import type { TimerExecutableTable } from './timer_executable_table';

interface SessionHistory {
	/** Copy the name of the routine/timer/workout...etc whatever that generated the WorkoutHistory */
	id: number;
	name: string;
	history: [];
	created_at: Date;
}
