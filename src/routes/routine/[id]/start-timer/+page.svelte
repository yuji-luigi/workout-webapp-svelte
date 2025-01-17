<script lang="ts">
	import { page } from '$app/stores';
	import { db } from '$lib/db/dexie-db/dexie-db';
	import type { RoutineJoined } from '$types/db/routine';
	import { onMount } from 'svelte';
	import TimerWatchNew from '../../../../lib/components/interval/TimerWatchNew.svelte';
	import { formatSecondsToTimer } from '../../../../lib/helpers/format-time/formatSecondsToTimer';
	import SetStepper from './SetStepper.svelte';
	import { snapshot } from 'yjs';
	import { extractTimerKeys, type Interval, type TimerKey } from '../../../../types/db/interval';
	import {
		initializeRoutineTimer,
		getRoutineTimer
	} from '../../../../lib/store/states/routine_timer.svelte';
	let { data }: { data: { routine: RoutineJoined } } = $props();
	let routine: RoutineJoined | undefined = data.routine;
	initializeRoutineTimer(routine);
	let routineTimer = getRoutineTimer();
	$effect(() => {
		console.log({
			exercise: routineTimer.currentExercise?.name,
			currentExerciseIndex: routineTimer.currentExerciseIndex
		});
	});

	// let currentExercise = $derived.by(() => {
	// 	if (!currentSet || currentExerciseIndex === null) return null;
	// 	return currentSet.exercises[currentExerciseIndex];
	// });
	// // TODO: NEED A STATE FOR SET_COMPLETED TO USE SET.TIMER
	// let currentTimer = $derived.by<Interval | null>(() => {
	// 	if (!currentExercise || !currentSet) return null;
	// 	if (currentSet.type.use_exercise_timer) {
	// 		return currentExercise.interval || null;
	// 	}
	// 	return currentSet.interval || null;
	// });

	// let currentTimerIndex = $state(0);

	// /** updates on change currentSet or currentExercise */
	// let currentTimerKeys = $derived.by<TimerKey[] | null>(() => {
	// 	let keys: TimerKey[] = [];
	// 	if (!currentSet) return [];
	// 	if (!currentExercise?.interval && currentSet.interval) {
	// 		keys = extractTimerKeys(currentSet.interval);
	// 		return keys;
	// 	}
	// 	if (currentExercise?.interval) {
	// 		keys = extractTimerKeys(currentExercise.interval);
	// 		return keys;
	// 	}
	// 	return keys;
	// });

	// let currentTime = $derived(
	// 	currentTimer && currentTimerKeys && currentTimer[currentTimerKeys[currentTimerIndex]]
	// );

	// function handleNextSet() {
	// 	if (!routine) return;
	// 	if (currentSetIndex < routine?.workout_sets.length - 1) {
	// 		currentSetIndex++;
	// 		currentExerciseIndex = 0;
	// 	}
	// }

	// function handlePrev() {
	// 	routineTimer.handlePrev();
	// 	if (!routine) return;
	// 	console.log('handlePrev');
	// 	/**
	// 	 * case go back to last exercise of current set (in interval of the set).
	// 	 * point to last exercise of current set from null exercise
	// 	 * checking: currentExerciseIndex is null.
	// 	 * */
	// 	if (currentExerciseIndex === null) {
	// 		currentExerciseIndex = routine.workout_sets[currentSetIndex].exercises.length - 1;
	// 		return;
	// 	}
	// 	/**
	// 	 * case go back to prev set.
	// 	 * point to last exercise of prev set
	// 	 * checking: is a first exercise of the current set.
	// 	 * */

	// 	if (currentExerciseIndex === 0 && currentSetIndex > 0) {
	// 		currentSetIndex--;
	// 		currentExerciseIndex = routine.workout_sets[currentSetIndex].exercises.length - 1;
	// 		return;
	// 	}
	// 	if (currentExerciseIndex && currentExerciseIndex > 0) {
	// 		currentExerciseIndex--;
	// 		return;
	// 	}
	// 	// /** all exercise are completed of the current set*/
	// 	// if () {
	// 	// 	/** set exercise index to last one of current set*/
	// 	// 	currentExerciseIndex = routine.workout_sets[currentSetIndex].exercises.length - 1;
	// 	// }
	// }
	// function handleNext() {
	// 	routineTimer.handleNext();

	// 	if (!routine) return;
	// 	// handle next interval index
	// 	if (currentTimerKeys && currentTimerIndex < currentTimerKeys.length - 1) {
	// 		currentTimerIndex++;
	// 		return;
	// 	}
	// 	currentTimerIndex = 0;

	// 	/** Case show "SET" interval, and select no exercise */
	// 	if (
	// 		currentExerciseIndex === currentSet.exercises.length - 1 &&
	// 		(currentSet.interval?.rest_time || currentSet.interval?.active_time)
	// 	) {
	// 		currentExerciseIndex = null;
	// 		return;
	// 	}
	// 	/** Case go to next set and first exercise*/
	// 	if (currentExerciseIndex === currentSet.exercises.length - 1 || currentExerciseIndex === null) {
	// 		handleNextSet();
	// 	} else {
	// 		currentExerciseIndex++;
	// 	}
	// }

	// const timerController = {
	// 	handleNext,
	// 	handlePrev
	// };
</script>

<div>
	<button onclick={routineTimer.handlePrev} class="button primary">prev</button>
	<button onclick={routineTimer.handleNext} class="button primary">next</button>
</div>
{#if routine && routineTimer.currentSet}
	<div class="flex-column">
		<SetStepper />
	</div>
	<div>
		<h5>current interval</h5>
		<pre>
      {#if routineTimer.currentSet.type.use_exercise_timer && routineTimer.currentExercise}
				{formatSecondsToTimer(
					routineTimer.currentExercise.interval?.active_time || 0
				)} rest
				{formatSecondsToTimer(
					routineTimer.currentExercise.interval?.active_time || 0
				)} workout
			{:else}
				{formatSecondsToTimer(
					routineTimer.currentSet?.interval?.rest_time || 0
				)} rest
				{formatSecondsToTimer(routineTimer.currentSet?.interval?.active_time || 0)} active
			{/if}
    </pre>
	</div>
	{#if routineTimer.currentInterval}
		<TimerWatchNew {routineTimer} time={routineTimer.currentTime || 0} />
	{/if}
{/if}

<style>
	.page {
		display: grid;
		place-items: center;
		min-height: calc(100dvh - var(--sub-header-height));
	}
	.flex-column {
		gap: 1rem;
		justify-content: center;
		align-items: center;
	}
</style>
