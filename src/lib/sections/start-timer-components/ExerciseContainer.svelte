<script lang="ts">
	import type { IntervalTimer } from '$lib/store/timers/interval_timer.svelte';
	import type { RoutineBlockJoined } from '../../../types/db/routine_block_interface';
	import { isBlockSetLog, type SetLogJoined } from '../../../types/db/session_history';
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
</script>

<div class="flex-row gap-xs align-center">
	<button class="button-min-style">
		<AddNoteSvg --size="24px" />
	</button>
	<p
		class="exercise-name"
		data-is-current={setInBlock.set_index === intervalTimer.currentFlow.set_index &&
			blockIndex === intervalTimer.currentFlow.block_index}
		data-is-done={blockIndex <= intervalTimer.currentFlow.block_index &&
			setInBlock.set_index < intervalTimer.currentFlow.set_index}
	>
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
