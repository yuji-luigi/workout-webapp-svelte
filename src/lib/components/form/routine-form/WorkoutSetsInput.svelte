<script lang="ts">
	import { onMount } from 'svelte';
	import type { WorkoutJoined } from '../../../../types/db/workout';
	import { createFormDataToObject } from '../../../helpers/handle-array-form-data';
	import { db_state } from '../../../store/lofi-db/workout-lofi.svelte';
	import InputGrid from '../../input/InputGrid.svelte';
	import { sleep } from '../../../helpers/sleep';
	let {
		className = '',
		name = '',
		type = 'number',
		form_id,
		...other
	}: {
		className?: string;
		name?: string;
		type?: string;
		form_id: string;
	} = $props();
	let { workouts } = db_state;
	let count = $state(0);
	function increment() {
		console.log('increment');
		count += 1;
	}
	let selected_workouts: WorkoutJoined[] = $state([]);
	let formEl: HTMLFormElement | undefined = $state();

	async function handleSetSelectedWorkouts(_: Event) {
		await sleep(10); // get the latest form data
		const form_data = new FormData(formEl);
		const dto = createFormDataToObject(form_data) as any;
		const _selected_workouts = workouts.filter((workout: WorkoutJoined) => {
			if (Array.isArray(dto.workouts)) {
				console.log('isArray');
				return dto.workouts.includes(workout.id);
			} else {
				console.log('!isArray');
				return dto.workouts === workout.id;
			}
		});
		selected_workouts = _selected_workouts;
		console.log({
			dto,
			_selected_workouts,
			workoutDB: workouts
		});
	}
	$effect(() => {
		workouts = db_state.workouts;
	});
	onMount(() => {
		formEl = document.getElementById(form_id) as HTMLFormElement;
		console.log({ formEl });

		formEl?.addEventListener('input', handleSetSelectedWorkouts);
	});
</script>

<!-- should include: 
1. n_sets
2. seconds_active
3. seconds_rest 
-->
<div class="subgrid">
	{#each selected_workouts as workout, index}
		<span class="exercise-name">{workout.exercise_name} {index}</span>
		<div class="input-group">
			n_sets
			<input name={`sets`} />
		</div>
		<div class="input-group">
			seconds_active
			<div>seconds active</div>
		</div>
		<div class="input-group">
			seconds_rest
			<div>seconds rest</div>
		</div>
		<div class="input-group">
			n_sets
			<div>sets count</div>
		</div>
	{/each}
</div>

<style>
	.subgrid {
		border: black 1px solid;
		grid-column: span 2;
		display: grid;
		grid-template-columns: subgrid;
		gap: var(--spacing-md);
	}
	.exercise-name {
		grid-column: 1/-1;
		text-align: center;
	}
	.input-group {
		display: grid;
		grid-column: span 2;
		gap: 0.5rem;
		grid-template-columns: subgrid;
		grid-auto-flow: dense;
		align-items: baseline;
		justify-items: end;
	}

	@container (max-width: 600px) {
		.input-group {
			gap: 0.25rem;
			justify-items: start;
			grid-column: 1/-1;
		}
	}
</style>
