<script lang="ts">
	import { slide } from 'svelte/transition';
	import Tooltip from '../../../../lib/components/Tooltip.svelte';
	import VerticalMenuBase from '../../../../lib/components/vertical-menu/VerticalMenuBase.svelte';
	import { getIntervalTimer } from '../../../../lib/store/timers/interval_timer.svelte';
	import type { RoutineJoined } from '../../../../types/db/routine';
	import { leftDrawerState } from '../../../../lib/store/left_drawer_state.svelte';

	let { routine }: { routine: RoutineJoined } = $props();
	const intervalTimer = getIntervalTimer();
	let drawerState = $state(leftDrawerState);
	let x = $derived(leftDrawerState);
</script>

<!-- <button class="appbar_toggle_btn" onclick={() => (isOpen = !isOpen)}>toggle</button> -->

<VerticalMenuBase position="left">
	<section class="routine-interval-drawer" data-open={drawerState.isOpen}>
		<header class="set-stepper">
			<!-- TODO: can count the reps of finished or on going workouts (see the current index of set and exercise) -->
			{#each routine.blocks as set, index}
				<div class="step">
					<Tooltip
						tooltip={routine.blocks[index].exercises.map((exercise) => exercise.name).join(', ')}
					>
						<h3>Set {index + 1}</h3>
						<h3>{set.type.name}</h3>
					</Tooltip>
				</div>
				{#if index < routine.blocks.length - 1}
					<div class="step">
						<div class="line"></div>
					</div>
				{/if}
			{/each}
		</header>
	</section>
</VerticalMenuBase>

<style>
	/* .appbar_toggle_btn {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
	}
	.routine-interval-drawer {
		margin-top: var(--sub-header-height);
		position: fixed;
		width: 300px;
		top: 0;
		bottom: 0;
		left: 0;
		padding: 1rem;
		transition: translate 0.3s;
	} */
</style>
