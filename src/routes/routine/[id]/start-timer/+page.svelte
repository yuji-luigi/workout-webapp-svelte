<script lang="ts">
	import { page } from '$app/stores';
	import { db } from '$lib/db/dexie-db/dexie-db';
	import type { RoutineJoined } from '$types/db/routine';
	import { onMount } from 'svelte';
	import TimerWatchNew from '../../../../lib/components/interval/TimerWatchNew.svelte';
	import { formatSecondsToTimer } from '../../../../lib/helpers/format-time/formatSecondsToTimer';
	import SetStepper from './SetStepper.svelte';
	import { snapshot } from 'yjs';
	import { extractTimerKeys, type Timer, type TimerKey } from '../../../../types/db/interval';
	let { data }: { data: { routine: RoutineJoined } } = $props();
	let routine: RoutineJoined | undefined = data.routine;
	let currentSetIndex = $state(0);
	let currentExerciseIndex = $state<number | null>(0);
	let currentSet = $derived(routine?.workout_sets[currentSetIndex]);

	let currentExercise = $derived.by(() => {
		if (!currentSet || currentExerciseIndex === null) return null;
		return currentSet.exercises[currentExerciseIndex];
	});
	// TODO: NEED A STATE FOR SET_COMPLETED TO USE SET.TIMER
	let currentTimer = $derived.by<Timer | null>(() => {
		if (!currentExercise || !currentSet) return null;
		if (currentSet.type.use_exercise_timer) {
			return currentExercise.interval;
		}
		return currentSet.interval;
	});

	let currentTimerIndex = $state(0);

	/** updates on change currentSet or currentExercise */
	let currentTimerKeys = $derived.by<TimerKey[] | null>(() => {
		let keys: TimerKey[] = [];
		if (!currentSet) return [];
		if (!currentExercise?.interval && currentSet.interval) {
			keys = extractTimerKeys(currentSet.interval);
			return keys;
		}
		if (currentExercise?.interval) {
			keys = extractTimerKeys(currentExercise.interval);
			return keys;
		}
		return keys;
	});

	let currentTime = $derived(
		currentTimer && currentTimerKeys && currentTimer[currentTimerKeys[currentTimerIndex]]
	);
	$effect(() => {
		// console.log({ currentTime, currentTimerIndex, currentTimerKeys });
		console.log({ currentTime });
	});

	function handleNextSet() {
		if (!routine) return;
		if (currentSetIndex < routine?.workout_sets.length - 1) {
			currentSetIndex++;
			currentExerciseIndex = 0;
		}
	}

	function handlePrev() {
		if (!routine) return;
		/** when the set is at least second and pointing at the first exercise*/
		if (currentExerciseIndex === 0 && currentSetIndex > 0) {
			currentSetIndex--;
			currentExerciseIndex = routine.workout_sets[currentSetIndex].exercises.length - 1;
		}
		if (currentExerciseIndex && currentExerciseIndex > 0) {
			currentExerciseIndex--;
			return;
		}
		/** all exercise are completed of the current set*/
		if (currentExerciseIndex === null) {
			/** set exercise index to last one of current set*/
			currentExerciseIndex = routine.workout_sets[currentSetIndex].exercises.length - 1;
		}
	}
	function handleNext() {
		if (!routine) return;
		// handle next interval index
		if (currentTimerIndex < currentTimerKeys.length - 1) {
			currentTimerIndex++;
			return;
		}
		currentTimerIndex = 0;

		/** Case show "SET" interval, and select no exercise */
		if (
			currentExerciseIndex === currentSet.exercises.length - 1 &&
			(currentSet.interval?.rest_time || currentSet.interval?.active_time)
		) {
			currentExerciseIndex = null;
			return;
		}
		/** Case go to next set and first exercise*/
		if (currentExerciseIndex === currentSet.exercises.length - 1 || currentExerciseIndex === null) {
			handleNextSet();
		} else {
			currentExerciseIndex++;
		}
	}
	const timerController = {
		handleNext,
		handlePrev
	};
</script>

<div>
	<button onclick={handlePrev} class="button primary">prev</button>
	<button onclick={handleNext} class="button primary">next</button>
</div>
{#if routine && currentSet}
	<div class="flex-column">
		<SetStepper {routine} {currentSetIndex} {currentExerciseIndex} />
	</div>
	<div>
		<h5>current interval</h5>
		<pre>
      {#if currentSet.type.use_exercise_timer && currentExercise}
				{formatSecondsToTimer(
					currentExercise.interval?.active_time || 0
				)} rest
				{formatSecondsToTimer(currentExercise.interval?.active_time || 0)} workout
			{:else}
				{formatSecondsToTimer(currentSet.interval?.rest_time || 0)} rest
				{formatSecondsToTimer(
					currentSet.interval?.active_time || 0
				)} active
			{/if}
    </pre>
	</div>
	{#if currentTimer}
		<TimerWatchNew {timerController} time={currentTime} />
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
