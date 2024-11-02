<script lang="ts">
	import { createFormDataToObject } from '$lib/helpers/handle-array-form-data';
	import { sleep } from '$lib/helpers/sleep';
	import InputGrid from '$lib/components/input/InputGrid.svelte';
	import WorkoutSelectMulti from '$lib/components/input/select-input/custom/WorkoutSelectMultiLabeled.svelte';
	import FormGrid from '$lib/components/form/FormGrid.svelte';
	import WorkoutSetsInput from './WorkoutSetsInput.svelte';

	let loading = false;
	const form_id = 'routine-form';
	function handleArrayFormData(form_data: FormData) {}
	async function handleSubmit(event: SubmitEvent) {
		loading = true;
		const form_data = new FormData(event.target as HTMLFormElement);
		const dto = createFormDataToObject(form_data);
		console.log(dto);
		await sleep(2000);
		loading = false;
	}
</script>

<div class="container">
	<h3>Create a new routine</h3>
	<FormGrid {handleSubmit} {loading} {form_id}>
		<InputGrid label="Name of the routine" name="name" type="text" />
		<InputGrid label="Slug of the routine(shown in url)" name="slug" type="text" />
		<InputGrid label="Description" name="description" type="text" />
		<InputGrid label="Image" name="image" type="file" />

		<WorkoutSelectMulti name="workouts" label="workouts" />
		<WorkoutSetsInput {form_id} />
	</FormGrid>
</div>

<style>
	label {
		white-space: nowrap;
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
	.fullWidth {
		grid-column: 1/-1;
	}
	.button {
		width: unset;
		margin-left: auto;
	}
</style>
