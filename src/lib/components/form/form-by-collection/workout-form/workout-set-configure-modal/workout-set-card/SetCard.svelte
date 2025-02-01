<script lang="ts">
	import type { ExerciseJoined } from '$types/db/exercise';
	import type { RoutineBlockJoined } from '$types/db/routine_block_interface';
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import ExerciseConfigCard from '../../../../../../../routes/workout/ExerciseConfigCard.svelte';
	import AddExercise from '../add-buttons/AddExercise.svelte';
	import BlockConfigs from './BlockConfigs.svelte';
	let {
		// wSet,
		index,
		form_id,
		wSet = $bindable(),
		removeSet
	}: {
		// wSet: Omit<RoutineBlockJoined, 'id'>;
		wSet: Omit<RoutineBlockJoined, 'id'>;
		index: number;
		form_id: string;
		removeSet: (index: number) => void;
	} = $props();
	let inputEl: HTMLInputElement | null = $state(null);
	let exercises = $state<any>([]);
	let selectedType = $state(wSet.type ? JSON.stringify(wSet.type) : '');

	function addExercise(exercise: ExerciseJoined) {
		// 1. open dialog
		// dialog has list of exercises.
		// 2. user selects exercise
		// 3. exercise is added to exercises array of this component wSet.exercises
		exercises.push(exercise);
		// how to add exercise to wSet.exercises from modal that is somewhere in parent?
		// is it possible to use Promise to get the selected exercise from modal?
	}
	function removeExercise(index: number) {
		exercises.splice(index, 1);
	}

	let parsedSelectedType = $state(wSet.type);
	onMount(() => {
		if (inputEl) {
			inputEl.dispatchEvent(new Event('input', { bubbles: true }));
		}
		exercises = wSet.exercises;
	});
	const preName = `blocks[${index}]`;
</script>

<input bind:this={inputEl} hidden type="text" name={preName} value={JSON.stringify(wSet)} />
<div in:scale={{ duration: 300, start: 0.8 }}>
	<div class="grid set-card card-primary">
		<div in:fade={{ duration: 300, delay: 150 }}>
			<BlockConfigs {index} {preName} {removeSet} {wSet} bind:selectedType />
			{#each exercises as exercise, index}
				<ExerciseConfigCard
					{removeExercise}
					{exercise}
					{index}
					preName={preName + '.exercises' + `[${index}]`}
					bind:selectedType
				/>
			{/each}
			<AddExercise onclick={addExercise} />
		</div>
	</div>
</div>

<style>
	.set-card {
		display: grid;
		background-color: var(--color-card-primary);
		padding-inline: var(--padding-inline-md);
		/* grid-template-columns: 1fr auto; */
		gap: var(--spacing-lg);
		/* border: var(--color-primary-600) solid 1.5px; */
		padding-block: var(--padding-block-md);
		border-radius: var(--border-radius-lg);
		@media (max-width: 768px) {
			grid-template-columns: 1fr;
			min-width: 100%;
			gap: var(--spacing-sm);
		}
		& > div {
			display: grid;
			gap: var(--spacing-md);
		}
	}
</style>
