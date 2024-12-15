<script lang="ts">
	import DialogGeneric from '$components/dialog/global/DialogGeneric.svelte';
	import type { Exercise } from '$types/db/exercise';
	import { getContext, onMount } from 'svelte';
	import AddSetCard from './AddSetCard.svelte';
	import WorkoutSetConfigSection from './WorkoutSetConfigSection.svelte';
	import { getForm } from '../../../../../store/form-store.svelte';
	import { sleep } from '../../../../../helpers/sleep';
	let {
		isOpen = $bindable(false)
	}: {
		isOpen: boolean;
		// selected_exercises: Exercise[];
		// handleSetSelectedWorkouts: () => void;
	} = $props();
	const form_id: string = getContext('form_id') || 'NULL_ID';
	// let formEl: HTMLFormElement | undefined = $state();
	// const inputEvent = new Event('input');

	// function dispatchInputEvent() {
	// 	formEl?.dispatchEvent(inputEvent);
	// }

	// async function handleSetSelectedWorkouts(_?: any) {
	// 	await sleep(10);
	// }

	// onMount(() => {
	// 	formEl = document.getElementById(form_id) as HTMLFormElement;
	// 	formEl?.addEventListener('input', handleSetSelectedWorkouts);
	// });
	let workoutSets = $state<any>([]);
</script>

<DialogGeneric bind:isOpen>
	<h2 class="title">Create sets and circuits</h2>
	<section class="sets-config-container">
		{#each workoutSets as exercise, index}
			<WorkoutSetConfigSection {exercise} {index} {form_id} />
		{/each}
		<AddSetCard
			onclick={() => {
				workoutSets.push({
					id: ''
				});
			}}
		/>
	</section>
</DialogGeneric>

<style>
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
