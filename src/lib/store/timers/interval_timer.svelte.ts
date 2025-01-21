import { readable } from 'svelte/store';
import type { ExerciseInRoutineJoined } from '../../../types/db/exercise';
import { extractTimerKeys, type Interval } from '../../../types/db/interval';
import type { RoutineJoined } from '../../../types/db/routine';
import type { WorkoutJoined } from '../../../types/db/workout';
import type { RoutineBlockJoined } from '../../../types/db/routine_block_interface';
import type { TimerBase } from './timer_abstract';
import type { WorkoutFlow } from '../../../types/db/workout-flow';
import type { IntervalOnlyLog } from '../../../types/db/session_history';

// need logic to control the current index of routine.
// calculate the

export class IntervalTimer implements TimerBase {
	currentIndex: number = $state(0);
	workoutFlows: WorkoutFlow[] = $state([]);
	currentFlow: WorkoutFlow = $derived(this.workoutFlows[this.currentIndex]);
	constructor(data: any) {
		this.workoutFlows = data;
	}
	handleNext(): void {
		if (this.currentIndex < this.workoutFlows.length - 1) {
			this.currentIndex++;
		}
	}
	handlePrev(): void {
		if (this.currentIndex > 0) {
			this.currentIndex--;
		}
	}

	handlePause(): void {
		throw new Error('Method not implemented.');
	}
	handleResume(): void {
		throw new Error('Method not implemented.');
	}
}

let routineTimer: IntervalTimer | null = null;
export const initializeIntervalTimer = (data: any) => {
	routineTimer = new IntervalTimer(data);
};
export const getIntervalTimer = () => routineTimer as IntervalTimer;

// interval factory creates interval out of RoutineJoined, Interval[], or RoutineBlockJoined[] etc
