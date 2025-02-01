<script lang="ts">
	import { onDestroy, onMount, type Snippet } from 'svelte';

	import type { RoutineJoined } from '../../../../types/db/routine';
	import RoutineTimerDrawer from '../../../../lib/sections/start-timer-components/RoutineTimerDrawer.svelte';
	import {
		initCurrentRoutineStore,
		routinesStore
	} from '../../../../lib/store/states/routine_store.svelte';

	let {
		children,
		data
	}: {
		children: Snippet;
		data: { routine: RoutineJoined };
	} = $props();

	onMount(() => {
		routinesStore.currentRoutine = data.routine;
		initCurrentRoutineStore();
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
