<script lang="ts">
	import DialogGeneric from '$components/dialog/global/DialogGeneric.svelte';
	import { sleep } from '$lib/helpers/sleep';
	import { getForm } from '$lib/store/form-store.svelte';
	import type { Exercise } from '$types/db/exercise';
	import { getContext, onMount } from 'svelte';
	import WorkoutSetConfigSection from './WorkoutSetConfigSection.svelte';

	let isOpen = $state(false);
	let selected_exercises: Exercise[] = $state([]);
	let formEl: HTMLFormElement | undefined = $state();
	const form_id: string = getContext('form_id') || 'NULL_ID';

	const inputEvent = new Event('input');

	function dispatchInputEvent() {
		formEl?.dispatchEvent(inputEvent);
	}

	async function handleSetSelectedWorkouts(_?: any) {
		await sleep(10);
		selected_exercises = getForm(form_id)?.exercises || [];
	}

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
	<section class="sets-config-container">
		{#each selected_exercises.filter((selected) => !!selected.id) as exercise, index}
			<WorkoutSetConfigSection
				handleDestroyInput={dispatchInputEvent}
				{exercise}
				{index}
				{form_id}
			/>
		{/each}
	</section>
</DialogGeneric>

<style>
	button {
		margin-left: auto;
	}
	.sets-config-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: var(--spacing-md);
		border-radius: var(--border-radius);
	}
	.title {
		margin-bottom: 1rem;
		text-align: center;
	}
</style>
