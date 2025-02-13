<script lang="ts">
	import { setContext } from 'svelte';
	import ForegroundRoutineVideo from '../../../../lib/components/routine-video/ForegroundRoutineVideo.svelte';
	import RoutineVideo from '../../../../lib/components/video/RoutineVideo.svelte';
	import { initializeIntervalTimer } from '../../../../lib/store/timers/interval_timer.svelte';
	import type { WorkoutFlow } from '../../../../types/db/workout-flow';
	let {
		data
	}: {
		data: {
			workoutFlows: WorkoutFlow[];
		};
	} = $props();
	const { workoutFlows } = data;
	initializeIntervalTimer(workoutFlows);
	// TODO: NOW WE DON'T NEED THIS.
	// setContext('timerSize', 150);
</script>

<RoutineVideo className="video-hero">
	<ForegroundRoutineVideo />
</RoutineVideo>

<style>
</style>
