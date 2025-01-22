<script lang="ts">
	import { slide } from 'svelte/transition';
	import Tooltip from '../../../../lib/components/Tooltip.svelte';
	import VerticalMenuBase from '../../../../lib/components/vertical-menu/VerticalMenuBase.svelte';
	import { getIntervalTimer } from '../../../../lib/store/timers/interval_timer.svelte';
	import type { RoutineJoined } from '../../../../types/db/routine';
	import { leftDrawerState } from '../../../../lib/store/left_drawer_state.svelte';
	import { isBlockSetLog, isSetLog } from '../../../../types/db/session_history';

	let { routine }: { routine: RoutineJoined } = $props();
	const intervalTimer = getIntervalTimer();
	let drawerState = $state(leftDrawerState);
	console.log(intervalTimer.workoutFlows);
</script>

<!-- <button class="appbar_toggle_btn" onclick={() => (isOpen = !isOpen)}>toggle</button> -->

<VerticalMenuBase position="left">
	<section class="routine-interval-drawer" data-open={drawerState.isOpen}>
		<header class="set-stepper">
			<!-- TODO: can count the reps of finished or on going workouts (see the current index of set and exercise) -->
			{#each routine.blocks as set, blockIndex}
				<Tooltip
					--width={'100%'}
					tooltip={routine.blocks[blockIndex].exercises.map((exercise) => exercise.name).join(', ')}
				>
					<div class="block-heading">
						<h3>Block {blockIndex + 1}</h3>
						<p>{set.type.name}</p>
					</div>
					{#each intervalTimer.workoutFlows.filter(isBlockSetLog(blockIndex)) as blockSets}
						<p>{blockSets.exercise.name}</p>
					{/each}
				</Tooltip>
				{#if blockIndex < routine.blocks.length - 1}
					<div class="step">
						<div class="line"></div>
					</div>
				{/if}
			{/each}
		</header>
	</section>
</VerticalMenuBase>

<style>
	.block-heading {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}
	.line {
		background-color: var(--text-color-white);
		height: 1px;
		width: 100%;
	}
</style>
