<script lang="ts">
	import type { RoutineJoined } from '../../../types/db/routine';
	import Divider from '../../components/divider/Divider.svelte';
	import VerticalMenuBase from '../../components/vertical-menu/VerticalMenuBase.svelte';
	import { leftDrawerState } from '../../store/left_drawer_state.svelte';
	import { getIntervalTimer } from '../../store/timers/interval_timer.svelte';
	import { getRoutineTimer } from '../../store/timers/routine_timer.svelte';

	import BlockContainer from './BlockContainer.svelte';

	let { routine }: { routine: RoutineJoined } = $props();
	const intervalTimer = getIntervalTimer();
	// const routineTimer = getRoutineTimer();

	let drawerState = $state(leftDrawerState);
	function handleNext() {
		intervalTimer.handleNext();
		// routineTimer.handleNext();
	}
	function handlePrev() {
		intervalTimer.handlePrev();
		// routineTimer.handlePrev();
	}
</script>

<!-- <button class="appbar_toggle_btn" onclick={() => (isOpen = !isOpen)}>toggle</button> -->

<VerticalMenuBase position="left">
	<header data-left-drawer-icon="checklist">
		<h4 class="title">
			{routine.name.toUpperCase()}
		</h4>
	</header>
	<section class="current-routine-board" data-open={drawerState.isOpen}>
		{#each routine.blocks as block, blockIndex}
			<BlockContainer
				--active-text-color="var(--color-primary-500)"
				--current-text-color="var(--color-primary-100)"
				{blockIndex}
				{intervalTimer}
				{block}
			/>
			<Divider --size="2px" />
		{/each}
	</section>

	<div>
		<button onclick={handlePrev} class="button primary">prev</button>
		<button onclick={handleNext} class="button primary">next</button>
	</div>
</VerticalMenuBase>

<style>
	header {
		margin-bottom: 1.5rem;
	}
	.current-routine-board {
		display: grid;
		gap: var(--gap-md);
	}
	section {
		color: var(--color-primary-800);
	}
</style>
