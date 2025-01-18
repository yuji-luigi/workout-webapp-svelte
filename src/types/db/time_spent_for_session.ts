// one routine many time_spent_for_session.

import type { TimerExecutableTable } from './timer_executable_table';

// many to one relationship with routine/workout_set/exercise_in_set
export interface TimeSpentForSession {
	id: number;
	/** seconds: int */
	time_spent: number;
	timer_executable_table_id: TimerExecutableTable;
	/** table_id: 1, item_id: 2 refers to routine with id 2 record */
	record_id: number;
}
