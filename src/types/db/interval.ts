import type { ExerciseInRoutineJoined } from './exercise';
import type { RoutineBlockJoined } from './routine_block_interface';

/**
 * Interval collection. But one interval is only used by one workout_set. so it is one to one relationship.
 * on update routine, and the interval is changed, new interval is created and set the id to updating routine.
 * the old interval might have the reference from SessionHistory.
 * so the old interval is not deleted.
 * To delete the old interval, first check there is no reference from SessionHistory and routine.
 * if there is no reference, deletion can be done.
 */
export interface Interval {
	id: number;
	rest_time?: number;
	active_time?: number;
}

export const TIMER_KEYS = ['rest_time', 'active_time'] as const;

export type TimerKey = (typeof TIMER_KEYS)[number];

export function extractTimerKeys(interval: Interval) {
	return (
		Object.keys(interval)
			.filter((key) => TIMER_KEYS.includes(key as TimerKey))
			/** sorting without argument so active_timer should be the first one. ASCII sorting */
			.sort() as TimerKey[]
	);
}

export function getFirstTimerKey({
	set,
	exercise
}: {
	set: RoutineBlockJoined;
	exercise: ExerciseInRoutineJoined;
}) {
	return (
		(exercise?.interval && extractTimerKeys(exercise?.interval)[0]) ||
		(set.interval && extractTimerKeys(set.interval)[0])!
	);
}

export function hasInterval(
	block: RoutineBlockJoined
): block is RoutineBlockJoined & { interval: Interval } {
	return block.interval?.rest_time !== undefined || block.interval?.active_time !== undefined;
}
