<script lang="ts">
	import DialogGeneric from '$components/dialog/global/DialogGeneric.svelte';
	import type { WSetJoined } from '$types/db/WSetI';
	import { getContext } from 'svelte';
	import AddSetCard from './add-buttons/AddSet.svelte';
	import ChooseSetTypeModal from './ChooseSetTypeModal.svelte';
	import WorkoutSetConfigCard from './workout-set-card/SetCard.svelte';
	import { sleep } from '../../../../../helpers/sleep';
	let {
		isOpen = $bindable(false)
	}: {
		isOpen: boolean;
		// selected_exercises: Exercise[];
		// handleSetSelectedWorkouts: () => void;
	} = $props();
	let workout_sets = $state<Omit<WSetJoined, 'id'>[]>([]);
	const form_id: string = getContext('form_id') || 'NULL_ID';
	let isOpenChooseSetTypeModal = $state(false);
	let formEl = $state<HTMLFormElement>();
	function addSet(setType: WSetTypeI) {
		workout_sets.push({
			type: setType,
			slug: '',
			name: '',
			exercises: [],
			n_set: 1
		});
		isOpenChooseSetTypeModal = false;
	}
	async function removeSet(index: number) {
		formEl = document.getElementById(form_id) as HTMLFormElement;
		workout_sets.splice(index, 1);
		formEl?.dispatchEvent(new Event('input', { bubbles: true }));
	}
</script>

<DialogGeneric fullScreen bind:isOpen>
	<h2 class="title">Create sets and circuits</h2>
	<section class="sets-config-container">
		{#each workout_sets as wSet, index}
			<WorkoutSetConfigCard {removeSet} {wSet} {index} {form_id} />
		{/each}
		<AddSetCard
			onclick={() => {
				isOpenChooseSetTypeModal = true;
				// workout_sets.push({
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
