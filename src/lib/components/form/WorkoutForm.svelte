<script lang="ts">
	import { sleep } from '../../helpers/sleep';
	import InputGrid from '../input/InputGrid.svelte';
	import SelectInputSingle from '../input/select-input/base/SelectInputSingle.svelte';
	import SelectWithFetch from '../input/select-input/SelectWithFetch.svelte';
	import FormGrid from './FormGrid.svelte';
	let loading = false;

	async function handleSubmit(event: SubmitEvent) {
		loading = true;
		const formData = new FormData(event.target as HTMLFormElement);
		const data = Object.fromEntries(formData.entries());
		console.log(data);
		await sleep(2000);
		loading = false;
	}
	async function handleSubmitWorkout(event: SubmitEvent) {
		console.log('workout');
		const formData = new FormData(event.target as HTMLFormElement);
		const data = Object.fromEntries(formData.entries());
		console.log(data);
	}
</script>

<div class="container">
	<h3 class="title">Create new workout</h3>
	<FormGrid {handleSubmit} {loading}>
		<InputGrid label="Exercise name" name="name" type="text" />

		<InputGrid label="Description" name="slug" type="text" />
		<InputGrid label="Slug" name="slug" type="text" />
		<SelectWithFetch name="workout_type" label="Type of workout" />
		<div class="input-group">
			<label for="name">Type of workout?</label>
			<SelectInputSingle
				name="slug_routine"
				loading={false}
				options={[
					{ value: 0, label: 'HIIT' },
					{ value: 1, label: 'reps and sets' }
				]}
			/>
		</div>

		<div class="input-group">
			<label for="name">How many sets?</label>
			<input type="number" alt="workout routine" name="n_set" />
		</div>
		<div class="input-group">
			<label for="name">Rest time(sec)</label>
			<input type="number" name="timer.seconds_rest" />
		</div>
		<div class="input-group">
			<label for="name">Active time(sec)</label>
			<input type="number" name="timer.seconds_active" />
		</div>

		<button type="submit">Submit</button>
	</FormGrid>
</div>

<style>
	.container {
		container-type: inline-size;
	}
	fieldset {
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
	input,
	textarea {
		width: 100%;
	}

	@container (max-width: 600px) {
		form {
			grid-template-columns: 1fr;
		}
		.input-group {
			gap: 0.25rem;
			justify-items: start;
			grid-column: 1/-1;
		}
	}
</style>
