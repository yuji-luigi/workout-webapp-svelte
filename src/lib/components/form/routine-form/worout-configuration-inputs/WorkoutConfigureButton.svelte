<script lang="ts">
	import { onMount } from 'svelte';
	import type { WorkoutJoined } from '../../../../../types/db/workout';
	import { sleep } from '../../../../helpers/sleep';
	import { getForm } from '../../../../store/form-store.svelte';
	import { db_state } from '../../../../store/lofi-db/workout-lofi.svelte';
	import CountDialog from '../../../dialog/count-dialog/CountDialog.svelte';
	import DialogGeneric from '../../../dialog/global/DialogGeneric.svelte';
	import WorkoutConfigRows from './WorkoutConfigRows.svelte';
	let {
		className = '',
		name = '',
		type = 'number',
		form_id,
		...other
	}: {
		className?: string;
		name?: string;
		type?: string;
		form_id: string;
	} = $props();
	let { workouts } = db_state;
	let dialog: HTMLDialogElement | undefined = $state();
	let isOpen = $state(false);
	let isOpenCounterModal = $state(false);
	let selected_workouts: WorkoutJoined[] = $state([]);
	let formEl: HTMLFormElement | undefined = $state();

	const inputEvent = new Event('input');

	function dispatchInputEvent() {
		formEl?.dispatchEvent(inputEvent);
	}

	async function handleSetSelectedWorkouts(_?: any) {
		await sleep(10);
		selected_workouts = getForm(form_id)?.workouts || [];
	}

	$effect(() => {
		workouts = db_state.workouts;
		selected_workouts = getForm(form_id)?.workouts || [];
	});

	onMount(() => {
		formEl = document.getElementById(form_id) as HTMLFormElement;
		formEl?.addEventListener('input', handleSetSelectedWorkouts);
	});
	async function openConfig() {
		await handleSetSelectedWorkouts();
		isOpen = true;
	}
</script>

<div class="full-width flex-row">
	<button onclick={openConfig} type="button" class="button primary">configure sets</button>
</div>

<!-- should include: 
1. n_sets
2. seconds_active
3. seconds_rest 
-->
<!-- <dialog bind:this={dialog}>content</dialog> -->
<DialogGeneric bind:isOpen>
	<h2 class="title">Sets and rest time</h2>
	<section class="grid">
		{#each selected_workouts.filter((selected) => !!selected.id) as workout, index}
			<WorkoutConfigRows handleDestroyInput={dispatchInputEvent} {workout} {index} {form_id} />
		{/each}
	</section>
	<CountDialog />
</DialogGeneric>

<style>
	button {
		margin-left: auto;
	}
	.title {
		margin-bottom: 1rem;
		text-align: center;
	}
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-lg);
		@media (max-width: 768px) {
			grid-template-columns: 1fr;
			gap: var(--spacing-sm);
		}
	}
	.input-section {
		display: grid;
		gap: var(--spacing-sm);
	}
	.input-group {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		font-size: var(--font-size-md);
	}
</style>
