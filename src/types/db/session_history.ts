import type { ExerciseInRoutine, ExerciseInRoutineJoined, ExerciseJoined } from './exercise';
import type { Interval } from './interval';
import type { Repetition } from './Repetition';
import type { TimerExecutableTable } from './timer_executable_table';
import type { User } from './user';
import type { Weight } from './weight';

export interface Session {
	/** Copy the name of the routine/timer/workout...etc whatever that generated the WorkoutHistory */
	id: number;
	routine_id: number;
	created_at: Date;
	created_by_id: number;
}

export interface SessionJoined extends Session {
	workout_logs: SetLogJoined[];
	created_by: User;
	// join from TimeSpend table by routine_id
	time_spent: number;
}

export interface SessionHistory {
	id: number;
	session_id: number;
	workout_log_id: number;
}

export interface SetLog {
	id: number;
	set_index: number;
	exercise_index: number;
	exercise_id: number;
	repetition_id: number;
	weight_id: number;
	interval_id: number;
	// not whole routine but the time spent for this single set. including rest time.
	time_spent: number;
}

// Join from SetLog and ExerciseInRoutine
export interface SetLogJoined {
	id: number;
	set_index: number;
	exercise_index: number;
	exercise: ExerciseInRoutineJoined;
	time_spent: number;
	interval_done?: Interval;
	interval_preset?: Interval;
	repetition_done: Repetition;
	repetition_preset: Repetition;
	weight_done: Weight;
	weight_preset: Weight;
}
