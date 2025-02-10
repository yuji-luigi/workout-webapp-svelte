<script lang="ts">
	import type { IntervalTimer } from '$lib/store/timers/interval_timer.svelte';
	import type { RoutineBlockJoined } from '../../../types/db/routine_block_interface';
	import { isBlockSetLog, type SetLogJoined } from '../../../types/db/routine_log';
	import Chip from '../../components/chip/Chip.svelte';
	import AddNoteSvg from '../../components/icons/svgs/AddNoteSvg.svelte';

	let {
		blockIndex,
		intervalTimer,
		setInBlock
	}: {
		blockIndex: number;
		intervalTimer: IntervalTimer;
		setInBlock: SetLogJoined;
	} = $props();
	const isCurrent = $derived(
		setInBlock.set_index === intervalTimer.currentTimer.setIndex &&
			blockIndex === intervalTimer.currentTimer.blockIndex
	);
	// TODO: correct this.(line-through by exercise or block.)
	const isDone = $derived(
		blockIndex <= intervalTimer.currentTimer.blockIndex &&
			setInBlock.set_index < intervalTimer.currentTimer.setIndex
	);
</script>

<div class="flex-row gap-xs align-center">
	<button class="button-min-style">
		<AddNoteSvg --size="24px" />
	</button>
	<p class="exercise-name" data-is-current={isCurrent} data-is-done={isDone}>
		{setInBlock.exercise.name}
	</p>
</div>

<style>
	.exercise-name[data-is-current='true'] {
		color: var(--current-text-color);
	}
	.exercise-name[data-is-done='true'] {
		text-decoration: line-through;
	}
</style>
