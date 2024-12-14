<script lang="ts">
	import type { Workout } from '$lib/../types/db/workout';
	import JsonForm from '$lib/components/form/JsonForm.svelte';
	import {
		workoutFormTable,
		type WorkoutFormPayload
	} from '$lib/data/template-json/dataTable/workouts-form-table-json';
	import { sleep } from '$lib/helpers/sleep';
	import { lofi_db } from '$lib/store/lofi-db/lofi_db.svelte';
	import { setContext } from 'svelte';
	import { workoutDtoFactory } from './createWorkoutDto.svelte';

	let loading = false;
	const form_id = 'routine-form';
	const workoutsY = lofi_db.workoutsY;
	setContext('form_table_json', workoutFormTable);
	async function handleSubmit(
		event: SubmitEvent & { target: HTMLFormElement },
		payload: Record<string, any>
	) {
		const workout = workoutDtoFactory(payload as WorkoutFormPayload);
		// workoutsY.push([payload as Workout]);
		await sleep(200);
	}
</script>

<div class="container">
	<h3>Create a new workout</h3>
	<JsonForm formTableFields={workoutFormTable} {handleSubmit} />
</div>
