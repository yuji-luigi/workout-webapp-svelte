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
	} from '../../../../lib/store/timers/routine_timer.svelte';
	import type { SessionJoined } from '../../../../types/db/session_history';
	import {
		getIntervalTimer,
		initializeIntervalTimer
	} from '../../../../lib/store/timers/interval_timer.svelte';
	import JsonForm from '../../../../lib/components/form/JsonForm.svelte';
	import type { WorkoutFlow } from '../../../../types/db/workout-flow';
	let {
		data
	}: {
		data: {
			routine: RoutineJoined;
			sessionLog: SessionJoined;
			workoutFlows: WorkoutFlow[];
		};
	} = $props();
	const { routine, sessionLog, workoutFlows } = data;
	initializeRoutineTimer(routine);
	initializeIntervalTimer(workoutFlows);
	const intervalTimer = getIntervalTimer();
	let routineTimer = getRoutineTimer();
	function handleNext() {
		intervalTimer.handleNext();
		routineTimer.handleNext();
	}
	function handlePrev() {
		intervalTimer.handlePrev();
		routineTimer.handlePrev();
	}
</script>

<div>
	<button onclick={handlePrev} class="button primary">prev</button>
	<button onclick={handleNext} class="button primary">next</button>
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
					routineTimer.currentExercise.interval?.rest_time || 0
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
