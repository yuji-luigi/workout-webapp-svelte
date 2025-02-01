import type { ExerciseInRoutineJoined } from '../../../types/db/exercise';
import { isSetLog } from '../../../types/db/session_history';
import type { WorkoutFlow } from '../../../types/db/workout-flow';
import type { TimerBase } from './timer_abstract';

// need logic to control the current index of routine.
// calculate the

export class IntervalTimer implements TimerBase {
	currentIndex: number = $state(0);
	blockIndex: number = $state(0);
	setIndex: number = $state(0);
	exerciseIndex: number = $state(0);
	/** all the timers(exercise, rest, set interval) */
	workoutFlows: WorkoutFlow[] = $state([]);
	/** whether rest, workout, set interval */
	currentFlow: WorkoutFlow = $derived(this.workoutFlows[this.currentIndex]);
	constructor(data: any) {
		this.workoutFlows = data;
	}
	handleNext(): void {
		if (this.currentIndex < this.workoutFlows.length - 1) {
			this.currentIndex++;
			this._updateIndexes();
		}
	}
	handlePrev(): void {
		if (this.currentIndex > 0) {
			this.currentIndex--;
			this._updateIndexes();
		}
	}

	handlePause(): void {
		throw new Error('Method not implemented.');
	}
	handleResume(): void {
		throw new Error('Method not implemented.');
	}

	private _updateIndexes() {
		this.blockIndex = this.currentFlow.block_index;
		this.setIndex = this.currentFlow.set_index;
		this.exerciseIndex = this.currentFlow.exercise_index;
	}
	/** the same thing as the currentFlow */
	get currentExercise(): ExerciseInRoutineJoined {
		if (isSetLog(this.currentFlow)) {
			return this.currentFlow.exercise;
		}
		const prevSet = this.workoutFlows[this.currentIndex - 1];
		if (isSetLog(prevSet)) {
			return prevSet.exercise;
		}
		// placeholder
		return {
			id: 0,
			repetition: {},
			name: 'Ready to workout?',
			slug: '',
			created_by_id: 0
		};
	}
}

let routineTimer: IntervalTimer | null = null;

export const initializeIntervalTimer = (data: any) => {
	routineTimer = new IntervalTimer(data);
};

export const getIntervalTimer = () => routineTimer as IntervalTimer;

// interval factory creates interval out of RoutineJoined, Interval[], or RoutineBlockJoined[] etc
