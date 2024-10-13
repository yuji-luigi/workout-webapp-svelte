<script lang="ts">
	import { sleep } from '../../helpers/sleep';
	import SelectInput from '../select-input/SelectInputMulti.svelte';
	import WorkoutSelectMulti from '../select-input/WorkoutSelectMulti.svelte';

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
	<fieldset disabled={loading} aria-busy={loading}>
		<form on:submit={handleSubmit}>
			<div class="input-group">
				<label for="name">Name</label>
				<input name="exercise.name" type="text" />
			</div>
			<div class="input-group">
				<label for="name">Description</label>
				<textarea name="exercise.name" />
			</div>
			<div class="input-group">
				<label for="name">Slug</label>
				<input name="slug_routine" type="text" />
			</div>
			<div class="input-group">
				<label for="name">Type of workout?</label>
				<SelectInput
					name="slug_routine"
					loading={false}
					options={[
						{ id: 0, name: 'HIIT' },
						{ id: 1, name: 'reps and sets' }
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
		</form>
	</fieldset>
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

	form {
		max-width: var(--max-width);
		display: grid;
		grid-template-columns: repeat(2, auto 1fr);
		gap: 1rem;
	}

	.input-group {
		display: grid;
		grid-column: span 2;
		grid-template-columns: subgrid;
		grid-auto-flow: dense;
		align-items: baseline;
		justify-items: end;
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
