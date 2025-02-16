<script lang="ts">
	import JsonForm from '$lib/components/form/JsonForm.svelte';
	import {
		workoutFormTable,
		type WorkoutFormPayload
	} from '$lib/data/template-json/dataTable/workouts-form-table-json';
	import { sleep } from '$lib/helpers/sleep';
	import { setContext } from 'svelte';
	import { db } from '../../../../db/dexie-db/dexie-db';
	import { workoutDtoFactory } from './createWorkoutDto.svelte';
	import { setFormIdCtx, setFormTableJsonCtx } from '../../../../store/form/form-context';

	let loading = false;
	const form_id = 'workout-create-form';
	const workoutsY = db.workouts;
	setFormTableJsonCtx(workoutFormTable);
	setFormIdCtx(form_id);

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
