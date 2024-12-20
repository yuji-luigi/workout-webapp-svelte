<script lang="ts">
	import DialogGeneric from '$components/dialog/global/DialogGeneric.svelte';
	import type { Exercise } from '$types/db/exercise';
	import { getContext, onMount } from 'svelte';
	import AddSetCard from './AddSetCard.svelte';
	import WorkoutSetConfigSection from './WorkoutSetConfigSection.svelte';
	import { getForm, setForm } from '../../../../../store/form-store.svelte';
	import { sleep } from '../../../../../helpers/sleep';
	import ChooseSetTypeModal from './ChooseSetTypeModal.svelte';
	import type { WSetJoined, WSet } from '../../../../../../types/db/workout-set';
	let {
		isOpen = $bindable(false)
	}: {
		isOpen: boolean;
		// selected_exercises: Exercise[];
		// handleSetSelectedWorkouts: () => void;
	} = $props();
	let wSets = $state<WSetJoined[]>([]);
	const form_id: string = getContext('form_id') || 'NULL_ID';
	let isOpenChooseSetTypeModal = $state(false);

	function addSet(data: WSetType) {
		const formData = getForm(form_id);
		wSets.push({
			id: new Date().getTime(),
			type: data,
			slug: '',
			name: '',
			exercises: [],
			n_set: 1
		});

		isOpenChooseSetTypeModal = false;
	}

	// function removeSet(index: number) {
	// 	wSets.splice(index, 1);
	// }

	// function updateSet(index: number, data: { type: any; n_set: number }) {
	// 	wSets[index] = data;
	// }

	// async function handleSetSelectedWorkouts() {
	// 	await sleep(1000);
	// 	isOpen = false;
	// }
</script>

<DialogGeneric fullScreen bind:isOpen>
	<h2 class="title">Create sets and circuits</h2>
	<section class="sets-config-container">
		{#each wSets as wSet, index}
			<WorkoutSetConfigSection {wSet} {index} {form_id} />
		{/each}
		<AddSetCard
			onclick={() => {
				isOpenChooseSetTypeModal = true;
				// wSets.push({
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
