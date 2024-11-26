<script lang="ts">
	import { onDestroy } from 'svelte';
	import { openDialog } from '../../../../store/global-dialog-store';
	import WorkoutSetInput from './ExerciseSetInput.svelte';
	import WorkoutTimeInput from './ExerciseTimeInput.svelte';
	import { sleep } from '../../../../helpers/sleep';
	import type { Exercise } from '../../../../../types/db/exercise';
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
	let el: HTMLDivElement | undefined = $state();
	const preName = `workouts[${index}]`;
</script>

<h2 class="exercise-name">{exercise.name}</h2>
<div bind:this={el} class="input-section">
	<WorkoutSetInput name={preName + '.n_set'} />
	<!-- {#if exercise.use_active_time}
		<WorkoutTimeInput
			label="exercise time"
			{index}
			{exercise}
			{form_id}
			name={preName + '.timer_seconds_active'}
		/>
	{/if} -->
	<!-- {#if exercise.use_rest_time}
		<WorkoutTimeInput
			label="rest time"
			{index}
			{exercise}
			{form_id}
			name={preName + '.timer_seconds_rest'}
		/>
	{/if} -->
</div>

<style>
	.input-section {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--spacing-sm);
	}
</style>
