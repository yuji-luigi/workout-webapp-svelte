<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { Exercise } from '$types/db/exercise';
	import WorkoutSetInput from './ExerciseSetInput.svelte';
	import WorkoutTimeInput from './ExerciseTimeInput.svelte';
	import ExerciseTypeInput from './ExerciseTypeInput.svelte';
	import { getForm } from '$lib/store/form-store.svelte';
	import SelectInputSingle from '../../../../input/select-input/base/SelectInputSingle.svelte';
	import Chip from '../../../../chip/Chip.svelte';
	import IconButton from '../../../../button/IconButton.svelte';
	let {
		exercise,
		index,
		form_id,
		handleDestroyInput
	}: {
		exercise: Exercise;
		index: number;
		form_id: string;
		handleDestroyInput: () => void;
	} = $props();
	onDestroy(() => {
		handleDestroyInput();
	});
	const preName = `exercises[${index}]`;
	let form = $state(getForm(form_id));
	$effect(() => {
		form = getForm(form_id);
		console.log('form', form);
	});
</script>

<section class="grid">
	<div class="flex-row set-header">
		<h2>SET#{index + 1}</h2>

		<SelectInputSingle
			width="auto"
			label="set type"
			collection="workout_set_type"
			name={preName + '.workout_set_type'}
			placeholder="type of set"
			required
			textAlign="center"
		/>
		<div class="flex-row add-workout">
			Add workout
			<IconButton --margin="0 0 0 auto">+</IconButton>
		</div>
	</div>
	<!-- <h2 class="exercise-name">{exercise.name}</h2> -->
	<div class="set-cards">
		<div class="input-section" draggable="true">
			<h3>{exercise.name}</h3>
			<WorkoutSetInput name={preName + '.n_set'} />
			<WorkoutTimeInput
				label="workout time"
				{index}
				{form_id}
				name={preName + '.timer_seconds_active'}
			/>
			<WorkoutTimeInput
				label="rest time"
				{index}
				{form_id}
				name={preName + '.timer_seconds_rest'}
			/>
		</div>
		<div class="input-section" draggable="true">
			<h3>{exercise.name}</h3>
			<WorkoutSetInput name={preName + '.n_set'} />
			<WorkoutTimeInput
				label="workout time"
				{index}
				{form_id}
				name={preName + '.timer_seconds_active'}
			/>
			<WorkoutTimeInput
				label="rest time"
				{index}
				{form_id}
				name={preName + '.timer_seconds_rest'}
			/>
		</div>
	</div>
</section>

<style>
	.grid {
		display: grid;
		background-color: var(--color-primary-800);
		padding-inline: var(--padding-inline-md);
		/* grid-template-columns: 1fr auto; */
		gap: var(--spacing-lg);
		border: var(--color-primary-600) solid 1.5px;
		padding-block: var(--padding-block-md);
		border-radius: var(--border-radius-lg);

		@media (max-width: 768px) {
			grid-template-columns: 1fr;
			gap: var(--spacing-sm);
		}
	}
	.set-header {
		grid-column: 1/-1;
		padding-inline: var(--padding-inline-lg);
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
	.flex-row {
		/* justify-content: space-between; */
		gap: var(--spacing-md);
		align-items: center;
	}
	.add-workout {
		margin-left: auto;
	}
	.input-section {
		display: grid;
		cursor: grab;
		padding-inline: var(--padding-inline-lg);
		border-radius: var(--border-radius-lg);
		grid-template-columns: 1fr auto auto;
		padding-block: 2rem;
		gap: var(--spacing-sm);
		background-color: var(--gray-700);
	}
</style>
