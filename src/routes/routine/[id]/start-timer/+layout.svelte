<script lang="ts">
	import { onDestroy, onMount, type Snippet } from 'svelte';

	import type { RoutineJoined } from '../../../../types/db/routine';
	import RoutineTimerDrawer from '../../../../lib/sections/start-timer-components/RoutineTimerDrawer.svelte';
	import {
		CurrentRoutineStore,
		initCurrentRoutineStore,
		routinesStore
	} from '../../../../lib/store/states/routine_store.svelte';
	import type { RoutineLogJoinedInterface } from '../../../../types/db/routine_log';
	import type { WorkoutFlow } from '../../../../types/db/workout-flow';
	import { initRoutineLogStore } from '../../../../lib/store/states/routine_log_store.svelte';
	import {
		getIntervalTimer,
		initializeIntervalTimer
	} from '../../../../lib/store/timers/interval_timer.svelte';

	let {
		children,
		data
	}: {
		children: Snippet;
		data: {
			routine: RoutineJoined;
			sessionLog: RoutineLogJoinedInterface;
			workoutFlows: WorkoutFlow[];
		};
	} = $props();

	// NOTE: can be done in +layout.ts file but here manage the lifecycle of the store
	onMount(() => {
		initCurrentRoutineStore(data.routine);
		const intervalTimer = initializeIntervalTimer(data.workoutFlows);
		initRoutineLogStore(data.sessionLog, intervalTimer);
	});
	onDestroy(() => {
		routinesStore.currentRoutine = null;
	});
</script>

<section>
	{@render children()}
	<RoutineTimerDrawer routine={data.routine} />
</section>

<style>
	section {
		display: grid;
		place-items: center;
		/* min-height: calc(100vh - var(--sub-header-height)); */
	}
</style>
