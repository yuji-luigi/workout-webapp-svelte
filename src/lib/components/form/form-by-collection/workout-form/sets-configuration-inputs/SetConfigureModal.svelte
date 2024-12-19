<script lang="ts">
	import DialogGeneric from '$components/dialog/global/DialogGeneric.svelte';
	import type { Exercise } from '$types/db/exercise';
	import { getContext, onMount } from 'svelte';
	import AddSetCard from './AddSetCard.svelte';
	import WorkoutSetConfigSection from './WorkoutSetConfigSection.svelte';
	import { getForm } from '../../../../../store/form-store.svelte';
	import { sleep } from '../../../../../helpers/sleep';
	import ChooseSetTypeModal from './ChooseSetTypeModal.svelte';
	let {
		isOpen = $bindable(false)
	}: {
		isOpen: boolean;
		// selected_exercises: Exercise[];
		// handleSetSelectedWorkouts: () => void;
	} = $props();
	const form_id: string = getContext('form_id') || 'NULL_ID';
	let isOpenChooseSetTypeModal = $state(false);
	function addSet(data: { type: any; n_set: number }) {
		workoutSets.push(data);
		isOpenChooseSetTypeModal = false;
	}
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

<DialogGeneric fullScreen bind:isOpen>
	<h2 class="title">Create sets and circuits</h2>
	<section class="sets-config-container">
		{#each workoutSets as exercise, index}
			<WorkoutSetConfigSection {exercise} {index} {form_id} />
		{/each}
		<AddSetCard
			onclick={() => {
				isOpenChooseSetTypeModal = true;
				// workoutSets.push({
				// 	id: ''
				// });
			}}
		/>
	</section>
</DialogGeneric>
<ChooseSetTypeModal bind:isOpen={isOpenChooseSetTypeModal} {addSet} />

<style>
	.sets-config-container {
		display: flex;
		align-items: start;
		gap: var(--spacing-md);
		border-radius: var(--border-radius);
		@media (max-width: 1023px) {
			display: grid;
			grid-template-columns: repeat(auto-fit, 1fr);
		}
	}

	.title {
		margin-bottom: 1rem;
		text-align: center;
	}
</style>
