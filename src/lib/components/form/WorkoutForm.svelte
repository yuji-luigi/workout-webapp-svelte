<script lang="ts">
	import { workout_types } from '../../data/ts/workout_type';
	import { sleep } from '../../helpers/sleep';
	import InputGrid from '../input/InputGrid.svelte';
	import SelectInputSingle from '../input/select-input/base/SelectInputSingle.svelte';
	import SelectSingleGrid from '../input/select-input/SelectSingleGrid.svelte';
	import SelectWithFetch from '../input/select-input/SelectWithFetch.svelte';
	import SelectTiles from '../input/select-input/tile/SelectTiles.svelte';
	import FormGrid from './FormGrid.svelte';
	let loading = false;
	const types = [
		{ value: 0, label: 'HIIT' },
		{ value: 1, label: 'reps and sets' }
	];

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
		<InputGrid label="Exercise name" name="name_exercise" type="text" />
		<InputGrid label="Description" name="description_exercise" type="text" />
		<InputGrid label="Slug" name="slug" type="text" />
		<SelectSingleGrid name="name_workout_type" options={types} label="Type of workout" />
		<SelectTiles
			options={workout_types.map((type) => ({
				...type,
				label: type.name,
				value: type.id
			}))}
			name="workout_type"
		/>
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
