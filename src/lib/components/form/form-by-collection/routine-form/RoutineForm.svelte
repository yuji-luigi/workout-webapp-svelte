<script lang="ts">
	import { sleep } from '$lib/helpers/sleep';
	import { lofi_db } from '$lib/store/lofi-db/lofi_db.svelte';
	import type { Workout } from '$types/db/workout';
	import { setContext } from 'svelte';
	import type { RoutineJoined } from '../../../../../types/db/routine';
	import { routineFormTableJson } from '../../../../data/template-json/dataTable/routine-form-table-json';
	import { validateForm } from '../../../../helpers/form-helper/form_validator';
	import { setFormErrors } from '../../../../helpers/form-helper/setFormErrors';
	import { setForm } from '../../../../store/form-store.svelte';
	import JsonForm from '../../JsonForm.svelte';

	let loading = false;
	const form_id = 'routine-form';
	setContext('form_table_json', routineFormTableJson);
	const routinesY = lofi_db.routinesY;
	async function handleSubmit(
		event: SubmitEvent & { target: HTMLFormElement },
		payload: Record<string, any>
	) {
		// validateForm(payload, routineFormTableJson, event.target);
		routinesY.push([payload as RoutineJoined]);
	}
</script>

<div class="container">
	<h3>Create a new Routine/Workout</h3>
	<JsonForm form_id="routine_form" formTableFields={routineFormTableJson} {handleSubmit} />

	<!-- <FormGrid {handleSubmit} {loading} {form_id}>
		<InputGrid label="Name of the routine" name="name" type="text" />
		<SelectSingleGrid
			label="type of the workout"
			name="type"
			placeholder="Workout type"
			collection="workout_set_type"
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
