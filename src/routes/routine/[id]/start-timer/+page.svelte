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
	import Video from '../../../../lib/components/video/Video.svelte';
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
	$effect(() => {
		console.log(intervalTimer.currentExercise?.videoSrc);
	});
</script>

<Video videoSrc={intervalTimer.currentExercise?.videoSrc || ''} />
<BlackBoardCard --width="100%">
	<div class="workout-board">
		<CurrentSetInfo />
		<button onclick={handlePrev} class="button primary">prev</button>
		<button onclick={handleNext} class="button primary">next</button>
	</div>
</BlackBoardCard>
<Video videoSrc={intervalTimer.currentExercise?.videoSrc || ''}>
	<div class="video-foreground">
		<div class="control-buttons">
			<button onclick={handlePrev} class="button primary">prev</button>
			<button onclick={handleNext} class="button primary">next</button>
		</div>
	</div>
</Video>

<style>
	.workout-board {
		width: 100%;
		min-height: calc(100dvh - var(--sub-header-height));
	}

	.video-foreground {
		display: flex;
		height: 100%;
		width: 100%;
	}
	.control-buttons {
		margin-top: auto;
		margin-inline: auto;
	}
</style>
