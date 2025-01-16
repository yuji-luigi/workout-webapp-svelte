import type { ExerciseInSetWorkout } from './exercise';
import type { WSetJoined } from './WSetI';

/**
 * Interval collection. But one interval is only used by one workout_set. so it is one to one relationship.
 */
export interface Interval {
	// id?: number;
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
	set: WSetJoined;
	exercise: ExerciseInSetWorkout;
}) {
	return (
		(exercise?.interval && extractTimerKeys(exercise?.interval)[0]) ||
		(set.interval && extractTimerKeys(set.interval)[0])!
	);
}
