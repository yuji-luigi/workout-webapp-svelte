<script lang="ts">
	import type { RoutineJoined } from '$types/db/routine';
	import { setContext } from 'svelte';
	import TimerWatchNew from '../../../../lib/components/interval/TimerWatchNew.svelte';
	import { formatSecondsToTimer } from '../../../../lib/helpers/format-time/formatSecondsToTimer';
	import SetStepper from '../../../../lib/sections/start-timer-components/SetStepper.svelte';
	import {
		getIntervalTimer,
		initializeIntervalTimer
	} from '../../../../lib/store/timers/interval_timer.svelte';
	import {
		getRoutineTimer,
		initializeRoutineTimer
	} from '../../../../lib/store/timers/routine_timer.svelte';
	import type { SessionJoined } from '../../../../types/db/session_history';
	import type { WorkoutFlow } from '../../../../types/db/workout-flow';
	import BlackBoardCard from '../../../../lib/components/card/BlackBoardCard.svelte';
	import CurrentSetInfo from '../../../../lib/sections/start-timer-components/CurrentSetInfo.svelte';
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
	setContext('timerSize', 150);
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

<BlackBoardCard --width="100%">
	<div class="workout-board">
		<CurrentSetInfo />
		<button onclick={handlePrev} class="button primary">prev</button>
		<button onclick={handleNext} class="button primary">next</button>
	</div>
</BlackBoardCard>

<!-- {#if routine && routineTimer.currentSet}
	<div class="flex-column">
		<SetStepper />
	</div>
	<div>
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
{/if} -->

<style>
	.workout-board {
		width: 100%;
		min-height: calc(100dvh - var(--sub-header-height));
	}
	.flex-column {
		gap: 1rem;
		justify-content: center;
		align-items: center;
	}

	.chalk {
		font-family: 'DkCrayonCrumble';
	}
</style>
