<script lang="ts">
	import { onMount } from 'svelte';
	import type { WorkoutJoined } from '../../../../../types/db/workout';
	import { openDialog } from '../../../../store/global-dialog-store';
	import { countDialogStates } from '../../../dialog/count-dialog/count-dialog-states.svelte';
	import WorkoutCounterInput from './WorkoutCounterInput.svelte';
	import { getForm } from '../../../../store/form-store.svelte';
	let {
		workout,
		index,
		form_id,
		isOpenCounterModal = $bindable()
	}: {
		workout: WorkoutJoined;
		index: number;
		form_id: string;
		isOpenCounterModal: boolean;
	} = $props();
	let el: HTMLDivElement | undefined = $state();
	let n_sets = $state(1);
	let seconds_rest = $state(0);
	let formData = $state(getForm(form_id));

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
<div bind:this={el} class="input-section">
	<WorkoutCounterInput bind:isOpenCounterModal {workout} />
	<!-- <WorkoutCounterInput bind:isOpenCounterModal {seconds_rest} /> -->
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
