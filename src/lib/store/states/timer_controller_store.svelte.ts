import type { Timer, TimerKey } from '$types/db/timer';
import type { RoutineJoined } from '../../../types/db/routine';

class TimerController {
	currentTimer: Timer | null = null;
	currentTimerKeys: TimerKey[] | null = null;
	currentTimerIndex: number = 0;
}

// interval factory creates interval out of RoutineJoined, Timer[], or WorkoutSetJoined[] etc
class TimerFactory {
	static fromRoutineJoined(routine: RoutineJoined) {
		const interval = routine.workout_sets.map((set) => set.interval).flat();
		return interval;
	}
}
