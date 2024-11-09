<script lang="ts">
	import { openDialog } from '../../../../store/global-dialog-store';
	import { countDialogStates } from '../../../dialog/count-dialog/count-dialog-states.svelte';
	import VideoHero from '../../../hero/video-hero/VideoHero.svelte';
	import TimeCounter from '../../../time-counter/TimeCounter.svelte';
	let {
		isOpenCounterModal = $bindable()
	}: {
		isOpenCounterModal: boolean;
	} = $props();

	let n_sets = $state(1);

	$effect(() => {
		n_sets = countDialogStates.count;
	});
</script>

<button
	type="button"
	class="input-group"
	onclick={() => {
		isOpenCounterModal = true;
		countDialogStates.content = TimeCounter;
		countDialogStates.actions = null;
		countDialogStates.count = n_sets;
	}}
>
	{n_sets}
	<span> Sets</span>
</button>

<style>
	.input-group {
		display: grid;
		grid-column: 1/-1;
		grid-template-columns: subgrid;
		justify-content: end;
		align-items: center;
		gap: var(--spacing-sm);
		font-size: var(--font-size-md);
		justify-items: end;
		cursor: pointer;
	}
</style>
