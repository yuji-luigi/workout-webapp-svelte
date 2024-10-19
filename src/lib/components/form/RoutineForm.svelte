<script lang="ts">
	import { handle_array_form_data } from '../../helpers/handle-array-form-data';
	import { sleep } from '../../helpers/sleep';
	import InputGrid from '../input/InputGrid.svelte';
	import WorkoutSelectMulti from '../input/select-input/custom/WorkoutSelectMultiLabeled.svelte';
	import SelectMultiGrid from '../input/select-input/SelectMultiGrid.svelte';
	import NewWorkoutModalFormOpenButton from '../open-dialog-button/NewWorkoutModalFormOpenButton.svelte';
	import FormGrid from './FormGrid.svelte';

	let loading = false;
	function handleArrayFormData(form_data: FormData) {}
	async function handleSubmit(event: SubmitEvent) {
		loading = true;
		const form_data = new FormData(event.target as HTMLFormElement);
		const dto = handle_array_form_data(form_data);
		console.log(dto);
		await sleep(2000);
		loading = false;
	}
</script>

<div class="container">
	<h3>Create a new routine</h3>
	<FormGrid {handleSubmit} {loading}>
		<InputGrid label="Name of the routine" name="name" type="text" />
		<InputGrid label="Slug of the routine(shown in url)" name="slug" type="text" />
		<InputGrid label="Description" name="description" type="text" />
		<InputGrid label="Image" name="image" type="file" />

		<WorkoutSelectMulti />

		<div class="fullWidth flex-column button-div">
			<button class="button" type="submit">Submit</button>
		</div>
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
