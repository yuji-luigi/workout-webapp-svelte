<script lang="ts">
	import type { IntervalTimer } from '$lib/store/timers/interval_timer.svelte';
	import type { RoutineBlockJoined } from '../../../types/db/routine_block_interface';
	import { isBlockSetLog } from '../../../types/db/session_history';
	import Chip from '../../components/chip/Chip.svelte';
	import AddNoteSvg from '../../components/icons/svgs/AddNoteSvg.svelte';
	import ExerciseContainer from './ExerciseContainer.svelte';

	let {
		blockIndex,
		intervalTimer,
		block
	}: {
		blockIndex: number;
		intervalTimer: IntervalTimer;
		block: RoutineBlockJoined;
	} = $props();
</script>

<div
	data-is-current={blockIndex === intervalTimer.currentTimer.blockIndex}
	data-is-done={blockIndex < intervalTimer.currentTimer.blockIndex}
	class="block-container"
>
	<div class="block-heading">
		<h3 class="block-heading-title">Block {blockIndex + 1}</h3>
		<Chip
			--chip-padding="0.1rem 0.5rem"
			--button-radius="90px"
			--background-color="var(--color-secondary)"
		>
			<span class="chip-text">
				{block.type.name}
			</span>
		</Chip>
	</div>
	{#each intervalTimer.workoutFlows.filter(isBlockSetLog(blockIndex)) as setInBlock}
		<ExerciseContainer {blockIndex} {intervalTimer} {setInBlock} />
	{/each}
</div>

<style>
	.block-heading {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}
	.chip-text {
		font-size: var(--font-size-xs);
	}
	.block-container[data-is-current='true'] {
		color: var(--active-text-color);
		& .block-heading-title {
			color: var(--current-text-color);
		}
	}
</style>
