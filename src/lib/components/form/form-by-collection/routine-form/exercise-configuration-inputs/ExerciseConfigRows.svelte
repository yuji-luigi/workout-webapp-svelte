<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { Exercise } from '../../../../../types/db/exercise';
	import WorkoutSetInput from './ExerciseSetInput.svelte';
	import WorkoutTimeInput from './ExerciseTimeInput.svelte';
	import ExerciseTypeInput from './ExerciseTypeInput.svelte';
	import { getForm } from '../../../../store/form-store.svelte';
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
	const preName = `exercises[${index}]`;
	let form = $state(getForm(form_id));
	$effect(() => {
		form = getForm(form_id);
		console.log('form', form);
	});
</script>

<h2 class="exercise-name">{exercise.name}</h2>
<div bind:this={el} class="input-section">
	<WorkoutSetInput name={preName + '.n_set'} />
	<!-- {#if exercise.use_active_time} -->
	{#if form.type?.use_active_time}
		<WorkoutTimeInput
			label="workout time"
			{index}
			{form_id}
			name={preName + '.timer_seconds_active'}
		/>
	{/if}
	<!-- {/if} -->
	<!-- {#if exercise.use_rest_time} -->
	{#if form.type?.use_rest_time}
		<WorkoutTimeInput label="rest time" {index} {form_id} name={preName + '.timer_seconds_rest'} />
	{/if}

	<!-- {/if} -->
</div>

<style>
	.input-section {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--spacing-sm);
	}
</style>
