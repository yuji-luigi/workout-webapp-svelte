/**
 * Timer collection. But one interval is only used by one workout_set. so it is one to one relationship.
 */
export interface Timer {
	// id?: number;
	rest_time: number;
	active_time: number;
}

export const TIMER_KEYS = ['rest_time', 'active_time'] as const;

export type TimerKey = (typeof TIMER_KEYS)[number];

export function extractTimerKeys(interval: Timer) {
	return (
		Object.keys(interval)
			.filter((key) => TIMER_KEYS.includes(key as TimerKey))
			/** sorting without argument so active_timer should be the first one. ASCII sorting */
			.sort() as TimerKey[]
	);
}
