import { readable } from 'svelte/store';
import type { ExerciseInSetWorkout } from '../../../types/db/exercise';
import { extractTimerKeys, type Interval } from '../../../types/db/interval';
import type { RoutineJoined } from '../../../types/db/routine';
import type { WorkoutJoined } from '../../../types/db/workout';
import type { WSetJoined } from '../../../types/db/WSetI';

// need logic to control the current index of routine.
// calculate the

export class RoutineTimer {
	// routine passed in
	#routine: RoutineJoined | Record<string, null> = {};
	// all the indexes for each property of the routine
	currentExerciseIndex: number | null = $state(0);
	currentSetIndex: number = $state(0);
	currentTimerIndex: number = $state(0);
	// timer keys updates when the current interval changes
	currentTimerKeys: string[] = $state([]);
	// the actual interval value. shown on the timer. and used to beep
	currentInterval?: number = $state();
	// the key of the interval. rest_time or active_time
	currentIntervalKey: 'rest_time' | 'active_time' = $state('active_time');
	// current WSetJoined Object. reactive with the currentSetIndex
	currentSet?: WSetJoined = $derived(this.#routine.workout_sets?.[this.currentSetIndex]);
	// current ExerciseInSetWorkout Object. reactive with the currentExerciseIndex
	currentExercise: ExerciseInSetWorkout | null = $derived(
		this.currentExerciseIndex === null
			? null
			: this.#routine.workout_sets?.[this.currentSetIndex]?.exercises?.[
					this.currentExerciseIndex
				] || null
	);

	constructor(routine: RoutineJoined) {
		this.#routine = routine;
		// start with the first set
		// this.currentSet = routine.workout_sets[0];
		// start with the first exercise
		const firstSet = routine.workout_sets?.[0];
		const firstExercise = firstSet?.exercises?.[0];
		// this.currentExercise = routine.workout_sets[0].exercises[0];
		this.currentIntervalKey =
			(firstExercise?.interval && extractTimerKeys(firstExercise?.interval)[0]) ||
			(firstSet?.interval && extractTimerKeys(firstSet?.interval)[0])!;
		if (!this.currentIntervalKey) {
			throw new Error('No interval key');
		}
		// start with the first interval in the first exercise
		this.currentInterval =
			this.currentExercise?.interval && this.currentExercise?.interval[this.currentIntervalKey];
		this.currentSetIndex = 0;
		this.currentExerciseIndex = 0;
		this.currentTimerKeys = extractTimerKeys(this.currentExercise?.interval || firstSet?.interval!);
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
			return;
		}

		this.currentExerciseIndex++;
		// console.log('handleNext', this.currentExerciseIndex);
	};
	handlePrev() {
		if (!this.#routine.workout_sets) return;
		/** when the set is at least second and pointing at the first exercise*/
		if (
			(this.currentExerciseIndex === 0 || this.currentExerciseIndex === null) &&
			this.currentSetIndex > 0
		) {
			this.currentSetIndex--;
			this.currentExerciseIndex =
				this.#routine.workout_sets[this.currentSetIndex].exercises.length - 1;
		}
		if (this.currentExerciseIndex && this.currentExerciseIndex > 0) {
			this.currentExerciseIndex--;
			return;
		}
	}
	handleStop() {}
	handleReset() {}

	private goToNextSet() {
		if (!this.#routine.workout_sets) return;
		if (this.currentSetIndex < this.#routine.workout_sets.length - 1) {
			this.currentSetIndex++;
			this.currentExerciseIndex = 0;
		}
	}

	private goToPreviousSet() {
		if (!this.#routine.workout_sets) return;
		if (this.currentSetIndex > 0) {
			this.currentSetIndex--;
			this.currentExerciseIndex =
				this.#routine.workout_sets[this.currentSetIndex].exercises.length - 1;
		}
	}
}

// interval factory creates interval out of RoutineJoined, Interval[], or WorkoutSetJoined[] etc

interface Timer {}
