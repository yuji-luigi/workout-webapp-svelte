import { readable } from 'svelte/store';
import type { ExerciseInSetWorkout } from '../../../types/db/exercise';
import { extractTimerKeys, type Interval } from '../../../types/db/interval';
import type { RoutineJoined } from '../../../types/db/routine';
import type { WorkoutJoined } from '../../../types/db/workout';
import type { WSetJoined } from '../../../types/db/WSetI';

// need logic to control the current index of routine.
// calculate the

class TimerController {}
export class RoutineTimer {
	#routine: RoutineJoined;
	currentSet?: WSetJoined;
	currentExercise?: ExerciseInSetWorkout;
	currentInterval?: number;
	currentIntervalKey: 'rest_time' | 'active_time';
	constructor(routine: RoutineJoined) {
		this.#routine = routine;
		// start with the first set
		this.currentSet = $state(routine.workout_sets[0]);
		// start with the first exercise
		this.currentExercise = $state(routine.workout_sets[0].exercises[0]);
		this.currentIntervalKey = $state(
			(this.currentExercise?.interval && extractTimerKeys(this.currentExercise?.interval)[0]) ||
				(this.currentSet.interval && extractTimerKeys(this.currentSet.interval)[0])!
		);
		if (!this.currentIntervalKey) {
			throw new Error('No interval key');
		}
		// start with the first interval in the first exercise
		this.currentInterval = $state(
			this.currentExercise?.interval && this.currentExercise?.interval[this.currentIntervalKey]
		);
	}
	handleNext() {}
	handlePrevious() {}
	handleStop() {}
	handleReset() {}

	get currentStates() {
		return {
			currentSet: this.currentSet,
			currentExercise: this.currentExercise,
			currentInterval: this.currentInterval,
			currentIntervalKey: this.currentIntervalKey
		};
	}
}

// interval factory creates interval out of RoutineJoined, Interval[], or WorkoutSetJoined[] etc

interface Timer {}
