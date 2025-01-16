import { readable } from 'svelte/store';
import type { ExerciseInSetWorkout } from '../../../types/db/exercise';
import { extractTimerKeys, type Interval } from '../../../types/db/interval';
import type { RoutineJoined } from '../../../types/db/routine';
import type { WorkoutJoined } from '../../../types/db/workout';
import type { WSetJoined } from '../../../types/db/WSetI';

// need logic to control the current index of routine.
// calculate the

export class RoutineTimer {
	#routine: RoutineJoined;
	currentSet?: WSetJoined = $state();
	currentExercise?: ExerciseInSetWorkout = $state();
	currentInterval?: number = $state();
	currentIntervalKey: 'rest_time' | 'active_time' = $state('active_time');
	currentExerciseIndex: number | null = $state(null);
	currentSetIndex: number = $state(0);
	currentTimerKeys: string[] = $state([]);
	currentTimerIndex: number = $state(0);
	constructor(routine: RoutineJoined) {
		this.#routine = routine;
		// start with the first set
		this.currentSet = routine.workout_sets[0];
		// start with the first exercise
		this.currentExercise = routine.workout_sets[0].exercises[0];
		this.currentIntervalKey =
			(this.currentExercise?.interval && extractTimerKeys(this.currentExercise?.interval)[0]) ||
			(this.currentSet.interval && extractTimerKeys(this.currentSet.interval)[0])!;
		if (!this.currentIntervalKey) {
			throw new Error('No interval key');
		}
		// start with the first interval in the first exercise
		this.currentInterval =
			this.currentExercise?.interval && this.currentExercise?.interval[this.currentIntervalKey];
		this.currentExerciseIndex = 0;
		this.currentSetIndex = 0;
		this.currentTimerKeys = extractTimerKeys(
			this.currentExercise?.interval || this.currentSet.interval!
		);
		this.currentTimerIndex = 0;
	}
	handleNext = () => {
		console.log('handleNext');
		if (!this.#routine) return;
		// handle next interval index
		if (this.currentTimerKeys && this.currentTimerIndex < this.currentTimerKeys.length - 1) {
			this.currentTimerIndex++;
			return;
		}
		this.currentTimerIndex = 0;

		/** Case show "SET" interval, and select no exercise */
		if (
			this.currentSet?.exercises &&
			this.currentExerciseIndex === this.currentSet.exercises.length - 1 &&
			(this.currentSet.interval?.rest_time || this.currentSet.interval?.active_time)
		) {
			this.currentExerciseIndex = null;
			return;
		}
		/** Case go to next set and first exercise*/
		if (
			(this.currentSet?.exercises &&
				this.currentExerciseIndex === this.currentSet.exercises.length - 1) ||
			this.currentExerciseIndex === null
		) {
			this.goToNextSet();
		} else {
			console.log('handleNext', this.currentExerciseIndex);
			this.currentExerciseIndex++;
		}
	};
	handlePrev() {
		if (!this.#routine) return;
		/** when the set is at least second and pointing at the first exercise*/
		if (this.currentExerciseIndex === 0 && this.currentSetIndex > 0) {
			this.currentSetIndex--;
			this.currentExerciseIndex =
				this.#routine.workout_sets[this.currentSetIndex].exercises.length - 1;
		}
		if (this.currentExerciseIndex && this.currentExerciseIndex > 0) {
			this.currentExerciseIndex--;
			return;
		}
		/** all exercise are completed of the current set*/
		if (this.currentExerciseIndex === null) {
			/** set exercise index to last one of current set*/
			this.currentExerciseIndex =
				this.#routine.workout_sets[this.currentSetIndex].exercises.length - 1;
		}
	}
	handleStop() {}
	handleReset() {}

	private goToNextSet() {
		if (this.currentSetIndex < this.#routine.workout_sets.length - 1) {
			this.currentSetIndex++;
			this.currentExerciseIndex = 0;
		}
	}

	private goToPreviousSet() {
		if (this.currentSetIndex > 0) {
			this.currentSetIndex--;
			this.currentExerciseIndex =
				this.#routine.workout_sets[this.currentSetIndex].exercises.length - 1;
		}
	}

	get currentStates() {
		return {
			currentSet: this.currentSet,
			currentExercise: this.currentExercise,
			currentInterval: this.currentInterval,
			currentIntervalKey: this.currentIntervalKey,
			currentExerciseIndex: this.currentExerciseIndex,
			currentSetIndex: this.currentSetIndex,
			currentTimerKeys: this.currentTimerKeys,
			currentTimerIndex: this.currentTimerIndex
		};
	}
	get a() {
		return this.currentExerciseIndex;
	}
}

// interval factory creates interval out of RoutineJoined, Interval[], or WorkoutSetJoined[] etc

interface Timer {}
