import type { Interval, TimerKey } from '$types/db/interval';
import type { RoutineJoined } from '../../../types/db/routine';

class TimerController {
	currentTimer: Interval | null = null;
	currentTimerKeys: TimerKey[] | null = null;
	currentTimerIndex: number = 0;
}

// interval factory creates interval out of RoutineJoined, Interval[], or WorkoutSetJoined[] etc
class TimerFactory {
	static fromRoutineJoined(routine: RoutineJoined) {
		const interval = routine.workout_sets.map((set) => set.interval).flat();
		return interval;
	}
}
