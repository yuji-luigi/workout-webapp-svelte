<script lang="ts">
	import type { RoutineJoined } from '$types/db/routine';
	import { setContext } from 'svelte';
	import BlackBoardCard from '../../../../lib/components/card/BlackBoardCard.svelte';
	import Video from '../../../../lib/components/video/RoutineVideo.svelte';
	import CurrentSetInfo from '../../../../lib/sections/start-timer-components/CurrentSetInfo.svelte';
	import {
		getIntervalTimer,
		initializeIntervalTimer
	} from '../../../../lib/store/timers/interval_timer.svelte';
	import {
		// getRoutineTimer,
		initializeRoutineTimer
	} from '../../../../lib/store/timers/routine_timer.svelte';
	import type { SessionJoined } from '../../../../types/db/session_history';
	import type { WorkoutFlow } from '../../../../types/db/workout-flow';
	import PrevButton from '../../../../lib/components/routine-video/interval-timer/PrevButton.svelte';
	import NextButton from '../../../../lib/components/routine-video/interval-timer/NextButton.svelte';
	import ForegroundRoutineVideo from '../../../../lib/components/routine-video/ForegroundRoutineVideo.svelte';
	import RoutineVideo from '../../../../lib/components/video/RoutineVideo.svelte';
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
	// initializeRoutineTimer(routine);
	initializeIntervalTimer(workoutFlows);
	setContext('timerSize', 150);
	const intervalTimer = getIntervalTimer();
</script>

<RoutineVideo videoSrc={intervalTimer.currentExercise?.videoSrc || ''} className="video-hero">
	<ForegroundRoutineVideo />
</RoutineVideo>

<style>
</style>
