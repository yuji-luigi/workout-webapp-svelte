<script lang="ts">
	import type { ExerciseJoined } from '$types/db/exercise';
	import type { WSetJoined } from '$types/db/WSetI';
	import { fade, scale } from 'svelte/transition';
	import ExerciseConfigCard from '../../../../../../../routes/workout/ExerciseConfigCard.svelte';
	import { isValidJSON } from '../../../../../../helpers/isValidJSON';
	import AddExercise from '../add-buttons/AddExercise.svelte';
	import SetCardHeader from './SetCardHeader.svelte';
	import { onMount } from 'svelte';
	let {
		// wSet,
		index,
		form_id,
		wSet = $bindable(),
		removeSet
	}: {
		// wSet: Omit<WSetJoined, 'id'>;
		wSet: Omit<WSetJoined, 'id'>;
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
	const preName = `workout_sets[${index}]`;
</script>

<input bind:this={inputEl} hidden type="text" name={preName} value={JSON.stringify(wSet)} />
<div in:scale={{ duration: 300, start: 0.8 }}>
	<div class="grid set-card">
		<div in:fade={{ duration: 300, delay: 150 }}>
			<SetCardHeader {index} {preName} {removeSet} {wSet} bind:selectedType />
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
		background-color: var(--color-primary-800);
		padding-inline: var(--padding-inline-md);
		/* grid-template-columns: 1fr auto; */
		gap: var(--spacing-lg);
		border: var(--color-primary-600) solid 1.5px;
		padding-block: var(--padding-block-md);
		border-radius: var(--border-radius-lg);
		min-width: 350px;
		@media (max-width: 768px) {
			grid-template-columns: 1fr;
			gap: var(--spacing-sm);
		}
		& > div {
			display: grid;
			gap: var(--spacing-md);
		}
	}

	.set-level-timers {
		display: grid;
		grid-template-columns: 1fr 1fr;
		place-content: center;
		place-items: center;
		gap: var(--spacing-xs);
	}
	.set-cards {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}
	/* .exercise-config-sub-grid {
		grid-template-columns: subgrid;
		gap: var(--spacing-sm);
	} */

	.set-config-header {
		align-items: start;
		h2 {
			place-self: start;
		}
		display: grid;
		grid-template-columns: 1fr auto;
		column-gap: var(--spacing-md);
	}
	.input-section {
		display: grid;
		padding-inline: var(--padding-inline-lg);
		border-radius: var(--border-radius-lg);
		grid-template-columns: 1fr auto auto;
		padding-block: 2rem;
		gap: var(--spacing-sm);
		background-color: var(--gray-700);

		&[draggable='true'] {
			cursor: grab;
		}
	}
</style>
