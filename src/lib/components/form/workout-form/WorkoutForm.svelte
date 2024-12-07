<script lang="ts">
	import FormGrid from '$lib/components/form/FormGrid.svelte';
	import InputGrid from '$lib/components/input/InputGrid.svelte';
	import ExerciseSelectMulti from '$lib/components/input/select-input/custom/ExerciseSelectMultiLabeled.svelte';
	import { sleep } from '$lib/helpers/sleep';
	import SelectSingleGrid from '../../input/select-input/SelectSingleGrid.svelte';
	import { workoutFormTable } from '../../../data/template-json/dataTable/workouts-form-table-json';
	import JsonForm from '../JsonForm.svelte';
	import { json } from '@sveltejs/kit';
	import { workoutsY } from '../../../store/lofi-db/workout-lofi.svelte';
	import type { Workout } from '../../../../types/db/workout';

	let loading = false;
	const form_id = 'routine-form';

	async function handleSubmit(
		event: SubmitEvent & { target: HTMLFormElement },
		payload: Record<string, any>
	) {
		loading = true;
		workoutsY.push([payload as Workout]);
		await sleep(200);
		loading = false;
	}
</script>

<div class="container">
	<h3>Create a new workout</h3>
	<JsonForm formTableFields={workoutFormTable} {handleSubmit} />

	<!-- <FormGrid {handleSubmit} {loading} {form_id}>
		<InputGrid label="Name of the routine" name="name" type="text" />
		<SelectSingleGrid
			label="type of the workout"
			name="type"
			placeholder="Workout type"
			collection="workout_type"
		/>
		<InputGrid label="Slug of the routine(shown in url)" type="slug" from="name" />
		<InputGrid label="Description" name="description" type="text" />
		<InputGrid label="Image" name="image" type="file" />
		<ExerciseSelectMulti name="exercises" label="exercises" />
		<button class="button primary">submit</button>
	</FormGrid> -->
</div>

<style>
	.button {
		width: unset;
		margin-left: auto;
		grid-column: -1 / 1;
		margin-block: auto;
	}
</style>
