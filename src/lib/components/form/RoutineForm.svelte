<script lang="ts">
	import { handle_array_form_data } from '../../helpers/handle-array-form-data';
	import { sleep } from '../../helpers/sleep';
	import InputGrid from '../input/InputGrid.svelte';
	import WorkoutSelectMulti from '../input/select-input/WorkoutSelectMulti.svelte';
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
		<InputGrid label="TEST" name="name" type="text" span={2} />
		<InputGrid label="TEST" name="name" type="text" />
		<InputGrid label="TEST" name="name" type="text" />
		<InputGrid label="TEST" name="name" type="text" />
		<div class="input-group">
			<label for="name">Name of the routine</label>
			<input name="name" type="text" />
		</div>
		<div class="input-group">
			<label for="slug">Slug of the routine</label>
			<input name="slug" type="text" />
		</div>

		<div class="input-group">
			<label for="name">Description of the routine</label>
			<textarea name="description_routine" />
		</div>
		<div class="input-group">
			<label for="image">image of the routine</label>
			<input type="file" alt="workout routine" name="image" />
		</div>
		<div class="input-group">
			<label for="workout">Workout</label>
			<WorkoutSelectMulti />
			<div class="fullWidth">
				<NewWorkoutModalFormOpenButton />
			</div>
		</div>
		<div class="fullWidth flex-column button-div">
			<button class="button primary" type="submit">Submit</button>
		</div>
	</FormGrid>
</div>

<style>
	fieldset {
		container-type: inline-size;
		border: none;
		border-radius: 5px;
		padding: 1rem;
		transition: opacity 0.3s ease-in-out;
		&[disabled] {
			opacity: 0.5;
		}
	}

	label {
		white-space: nowrap;
	}

	form {
		max-width: var(--max-width);
		display: grid;
		grid-template-columns: repeat(2, auto 1fr);
		gap: 1rem;
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
		form {
			grid-template-columns: 1fr;
			max-width: 400px;
			margin-inline: auto;
		}
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
