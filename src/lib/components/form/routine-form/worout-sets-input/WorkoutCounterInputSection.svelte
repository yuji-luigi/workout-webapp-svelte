<script lang="ts">
	import { ContentFormat } from 'yjs';
	import type { WorkoutJoined } from '../../../../../types/db/workout';
	import TimeCounter from '../../../time-counter/TimeCounter.svelte';
	import Counter from '../../../Counter.svelte';
	import ClickableDiv from '../../../ClickableDiv.svelte';
	import { openDialog } from '../../../../store/global-dialog-store';
	import WorkoutCounterInput from './WorkoutCounterInput.svelte';
	import CountDialog from '../../../dialog/count-dialog/CountDialog.svelte';
	import { countDialogStates } from '../../../dialog/count-dialog/count-dialog-states.svelte';
	import VideoHero from '../../../hero/video-hero/VideoHero.svelte';
	import CountInput from '../../../counter/CountInput.svelte';
	let {
		workout,
		index,
		isOpenCounterModal = $bindable()
	}: {
		workout: WorkoutJoined;
		index: number;
		isOpenCounterModal: boolean;
	} = $props();
	let count = $state(0);
	let n_sets = $state(1);
	let dialog: HTMLDialogElement | undefined = $state();
	let seconds_rest = $state(0);
	let seconds_active = $state(0);
	$effect(() => {
		n_sets = countDialogStates.count;
	});
	function handleOpenModal({
		componentInDialog
	}: {
		componentInDialog: { component: any; props: any };
	}) {
		openDialog({
			componentInDialog
		});
	}
</script>

<h2 class="exercise-name">{workout.exercise_name}</h2>
<div class="input-section">
	<WorkoutCounterInput {n_sets} bind:isOpenCounterModal />
	<WorkoutCounterInput bind:isOpenCounterModal {seconds_rest} />
	<!-- <button type="button" class="input-group">
		{n_sets}
		<span> Sets </span>
	</button>
	<button class="input-group">
		0:00
		<span>rest</span>
	</button>
	<button class="input-group">
		0:00
		<span> active </span>
	</button> -->
</div>

<style>
	input {
		font-size: var(--font-size-md);
		text-align: end;
	}
	span {
		text-align: end;
	}
	.input-section {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--spacing-sm);
	}
	.sets-input {
		border: none;
	}
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
