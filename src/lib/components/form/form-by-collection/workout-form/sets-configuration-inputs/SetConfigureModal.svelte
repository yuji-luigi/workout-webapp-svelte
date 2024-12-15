<script lang="ts">
	import DialogGeneric from '$components/dialog/global/DialogGeneric.svelte';
	import type { Exercise } from '$types/db/exercise';
	import { fade } from 'svelte/transition';
	import AddSetCard from './AddSetCard.svelte';
	import WorkoutSetConfigSection from './WorkoutSetConfigSection.svelte';
	let {
		isOpen,
		selected_exercises,
		form_id,
		dispatchInputEvent
	}: {
		isOpen: boolean;
		selected_exercises: Exercise[];
		formEl: HTMLFormElement | undefined;
		form_id: string;
		inputEvent: Event;
		dispatchInputEvent: () => void;
		handleSetSelectedWorkouts: () => void;
	} = $props();

	let workoutSets = $state<any>([]);
</script>

<DialogGeneric bind:isOpen>
	<h2 class="title">Create sets and circuits</h2>
	<section class="sets-config-container">
		{#each selected_exercises.filter((selected) => !!selected.id) as exercise, index}
			<WorkoutSetConfigSection
				handleDestroyInput={dispatchInputEvent}
				{exercise}
				{index}
				{form_id}
			/>
		{/each}
		{#each workoutSets as exercise, index}
			<WorkoutSetConfigSection
				handleDestroyInput={dispatchInputEvent}
				{exercise}
				{index}
				{form_id}
			/>
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
