<script lang="ts">
	import type { WorkoutJoined } from '../../../../../types/db/workout';
	import { openDialog } from '../../../../store/global-dialog-store';
	import WorkoutCounterInput from './WorkoutCounterInput.svelte';
	let {
		workout,
		index,
		form_id
	}: {
		workout: WorkoutJoined;
		index: number;
		form_id: string;
	} = $props();
	let el: HTMLDivElement | undefined = $state();
</script>

<h2 class="exercise-name">{workout.exercise_name}</h2>
<div bind:this={el} class="input-section">
	<WorkoutCounterInput {index} {workout} {form_id} />
	<WorkoutCounterInput {index} {workout} {form_id} />
	<WorkoutCounterInput {index} {workout} {form_id} />
</div>

<style>
	.input-section {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--spacing-sm);
	}
</style>
