<script lang="ts">
	import { setContext } from 'svelte';
	import type { RoutineJoined } from '../../../../../types/db/routine';
	import { routineFormTableJson } from '../../../../data/template-json/dataTable/routine-form-table-json';
	import JsonForm from '../../JsonForm.svelte';
	import { dexie_db } from '../../../../db/dexie-db/dexie-adaptor';
	import { db } from '../../../../db/dexie-db/dexie-db';
	import { setForm, setFormId } from '../../../../store/form-store.svelte';

	setFormId('routine-form');
	setContext('form_table_json', routineFormTableJson);
	const routines = db.exercises;
	async function handleSubmit(
		_: SubmitEvent & { target: HTMLFormElement },
		payload: Record<string, any>
	) {
		// validateForm(payload, routineFormTableJson, event.target);
		routines.add(payload as any);
	}
	setForm;
</script>

<div class="container">
	<h3>Create a new Routine/Workout</h3>
	<JsonForm formTableFields={routineFormTableJson} {handleSubmit} />

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
