<script lang="ts">
	import { page } from '$app/stores';
	import { db } from '$lib/db/dexie-db/dexie-db';
	import type { RoutineJoined } from '$types/db/routine';
	import { onMount } from 'svelte';
	import SetStepper from './SetStepper.svelte';
	import TimerWatch from '../../../../lib/components/timer/TimerWatch.svelte';
	import TimerWatchNew from '../../../../lib/components/timer/TimerWatchNew.svelte';
	import { formatSecondsToTimer } from '../../../../lib/helpers/format-time/formatSecondsToTimer';
	import type { ExerciseInSetWorkout } from '../../../../types/db/exercise';
	let routine: RoutineJoined | undefined = $state();
	let dialog: HTMLDialogElement;
	let currentSetIndex = $state(0);
	let currentExerciseIndex = $state(0);
	let currentSet = $derived(routine?.workout_sets[currentSetIndex]);
	let currentExercise = $derived.by(() => {
		if (!currentSet) return null;
		return currentSet.exercises[currentExerciseIndex];
	});
	onMount(() => {
		if ($page.params.id) {
			db.routine.get({ id: Number($page.params.id) }).then((r) => {
				routine = r;
			});
		}
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
		if (currentExerciseIndex > 0) {
			currentExerciseIndex--;
			return;
		}
		if (currentExerciseIndex === 0 && currentSetIndex > 0) {
			currentSetIndex--;
			currentExerciseIndex = routine.workout_sets[currentSetIndex].exercises.length - 1;
		}
	}
	function handleNext() {
		if (!routine) return;
		if (routine.workout_sets[currentSetIndex].exercises.length - 1 > currentExerciseIndex) {
			currentExerciseIndex++;
		} else {
			handleNextSet();
		}
	}
</script>

{#if routine && currentSet && currentExercise}
	<div class="flex-column">
		<SetStepper {routine} {currentSetIndex} {currentExerciseIndex} />
		<div>
			<button onclick={handlePrev} class="button primary">prev</button>
			<button onclick={handleNext} class="button primary">next</button>
		</div>
	</div>
	<div>
		<h5>current timer</h5>
		<pre>
      {#if currentSet.type.use_exercise_timer}
				{formatSecondsToTimer(currentExercise.timer?.active_time || 0)} rest
				{formatSecondsToTimer(
					currentExercise.timer?.active_time || 0
				)} workout
			{:else}
				{formatSecondsToTimer(currentSet.timer?.rest_time || 0)} rest
				{formatSecondsToTimer(
					currentSet.timer?.active_time || 0
				)} active
			{/if}
    </pre>
	</div>
	<TimerWatchNew {routine} />
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
