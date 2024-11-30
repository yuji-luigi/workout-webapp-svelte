<script lang="ts">
	import { onMount } from 'svelte';
	import type { Exercise } from '../../../../../types/db/exercise';
	import { sleep } from '../../../../helpers/sleep';
	import { getForm } from '../../../../store/form-store.svelte';
	import { db_state } from '../../../../store/lofi-db/workout-lofi.svelte';
	import DialogGeneric from '../../../dialog/global/DialogGeneric.svelte';
	import ExerciseConfigRows from './ExerciseConfigRows.svelte';
	let {
		form_id
	}: {
		/** not necessary since we have form context*/
		form_id: string;
	} = $props();
	let { exercises } = db_state;
	let isOpen = $state(false);
	let selected_exercises: Exercise[] = $state([]);
	let formEl: HTMLFormElement | undefined = $state();

	const inputEvent = new Event('input');

	function dispatchInputEvent() {
		formEl?.dispatchEvent(inputEvent);
	}

	async function handleSetSelectedWorkouts(_?: any) {
		await sleep(10);
		selected_exercises = getForm(form_id)?.exercises || [];
	}

	$effect(() => {
		exercises = db_state.exercises;
		selected_exercises = getForm(form_id)?.exercises || [];
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

<DialogGeneric bind:isOpen>
	<h2 class="title">Sets and rest time</h2>
	<section class="grid">
		{#each selected_exercises.filter((selected) => !!selected.id) as exercise, index}
			<ExerciseConfigRows handleDestroyInput={dispatchInputEvent} {exercise} {index} {form_id} />
		{/each}
	</section>
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
		grid-template-columns: 1fr auto;
		gap: var(--spacing-lg);
		@media (max-width: 768px) {
			grid-template-columns: 1fr;
			gap: var(--spacing-sm);
		}
	}
</style>
