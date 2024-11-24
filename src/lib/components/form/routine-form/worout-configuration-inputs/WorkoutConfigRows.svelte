<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { WorkoutJoined } from '../../../../../types/db/workout';
	import { openDialog } from '../../../../store/global-dialog-store';
	import WorkoutSetInput from './WorkoutSetInput.svelte';
	import WorkoutTimeInput from './WorkoutTimeInput.svelte';
	import { sleep } from '../../../../helpers/sleep';
	let {
		workout,
		index,
		form_id,
		handleDestroyInput
	}: {
		workout: WorkoutJoined;
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

<h2 class="exercise-name">{workout.exercise_name}</h2>
<div bind:this={el} class="input-section">
	<WorkoutSetInput name={preName + '.n_set'} />
	{#if workout.use_active_time}
		<WorkoutTimeInput
			label="workout time"
			{index}
			{workout}
			{form_id}
			name={preName + '.timer_seconds_active'}
		/>
	{/if}
	{#if workout.use_rest_time}
		<WorkoutTimeInput
			label="rest time"
			{index}
			{workout}
			{form_id}
			name={preName + '.timer_seconds_rest'}
		/>
	{/if}
</div>

<style>
	.input-section {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--spacing-sm);
	}
</style>
