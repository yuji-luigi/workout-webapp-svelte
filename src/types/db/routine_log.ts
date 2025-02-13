import type { ExerciseInRoutine, ExerciseInRoutineJoined, ExerciseJoined } from './exercise';
import type { Interval } from './interval';
import type { Repetition } from './Repetition';
import type { RoutineJoined } from './routine';
import type { TimerExecutableTable } from './timer_executable_table';
import type { User } from './user';
import type { Weight } from './weight';
import type { WorkoutFlow } from './workout-flow';

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

export function isBlockLog(log: WorkoutFlow): log is BlockLog {
	return 'block_index' in log;
}
export function isSetLog(log: WorkoutFlow): log is SetLogJoined {
	return 'exercise' in log;
}
export function isExerciseLog(log: WorkoutFlow): log is ExerciseLogJoined {
	return 'exercise_index' in log;
}

export function isBlockSetLog(blockIndex: number) {
	// Return a function that TS recognizes as a type predicate
	return (flow: WorkoutFlow): flow is SetLogJoined => {
		return flow.block_index === blockIndex && isSetLog(flow);
	};
}

export type BaseLog = {
	time_spent: number;
	interval_preset: Interval | undefined;
	interval_done: Interval | undefined;
};

export type BlockLog = BaseLog & {
	block_index: number;
	set_logs: SetLogJoined[];
};
// Join from SetLog and ExerciseInRoutine
export type SetLogJoined = BaseLog & {
	set_index: number;
	block_index: number;
	exerciseLogs: ExerciseLogJoined[];
};
export type ExerciseLogJoined = BaseLog & {
	exercise: ExerciseInRoutineJoined;
	exercise_index: number;
	block_index: number;
	set_index: number;
	repetition_done: Repetition;
	repetition_preset: Repetition;
	weight_done?: Weight;
	weight_preset?: Weight;
};

export interface RoutineLogJoinedInterface {
	id: undefined;
	created_at: Date;
	created_by: string;
	routine: RoutineJoined;
	block_logs: BlockLog[];
	time_spent: number;
}

// setLog definition: the purpose of the object
// 1. log of the set done at that moment
// 2. the name of the exercise refers to the exercise in the of that moment. don't save with the id. save the string at the moment.
// interval_preset: can be id never modify on update the routine.
