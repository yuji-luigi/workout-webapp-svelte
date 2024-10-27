<script lang="ts">
	import type { WorkoutJoined } from '../../../../types/db/workout';
	import { workout_types } from '../../../data/ts/workout_type';
	import { sleep } from '../../../helpers/sleep';
	import { db_state } from '../../../store/lofi-db/workout-lofi.svelte';
	// import { db_state } from '../../../store/lofi-db/workout-lofi.svelte';
	import InputGrid from '../../input/InputGrid.svelte';
	import SelectInputSingle from '../../input/select-input/base/SelectInputSingle.svelte';
	import SelectSingleGrid from '../../input/select-input/SelectSingleGrid.svelte';
	import SelectWithFetch from '../../input/select-input/SelectWithFetch.svelte';
	import SelectTiles from '../../input/select-input/tile/SelectTiles.svelte';
	import FormGrid from '../FormGrid.svelte';
	import { handleSaveWorkoutLocally, type WorkoutFormData } from './saveJoinedWorkout.svelte';
	let loading = false;
	const types = [
		{ value: 0, label: 'HIIT' },
		{ value: 1, label: 'reps and sets' }
	];
	const socket = new WebSocket('ws://localhost:1234');
	socket.addEventListener('open', () => {
		console.log('connected');
	});
	// save exercise + timer + joined workout
	async function handleSubmit(event: SubmitEvent) {
		loading = true;
		const formData = new FormData(event.target as HTMLFormElement);
		const data = Object.fromEntries(formData.entries()) as unknown as WorkoutJoined;

		try {
			handleSaveWorkoutLocally(data);
		} catch (error) {
			throw new Error(error);
		}
		await sleep(2000);
		loading = false;
	}
</script>

<div class="container">
	<h3 class="title">Create new workout</h3>

	<FormGrid {handleSubmit} {loading}>
		<InputGrid
			label="Id"
			name="exercise_id"
			type="hidden"
			value={db_state.exercises?.length ? db_state.exercises?.length + 1 : 1}
			className="display-none"
			hidden
		/>
		<InputGrid
			label="Id"
			name="id"
			type="hidden"
			className="display-none"
			value={db_state.workouts?.length ? db_state.workouts?.length + 1 : 1}
		/>
		<InputGrid label="Exercise name" name="exercise_name" type="text" />
		<InputGrid label="Description" name="exercise_description" type="text" />
		<InputGrid label="Slug" name="slug" type="text" />
		<SelectTiles
			options={workout_types.map((type) => ({
				...type,
				label: type.name,
				value: type.id
			}))}
			name="workout_type_id"
		/>
		<div class="input-group">
			<label for="name">Rest time(sec)</label>
			<input min="0" type="number" name="timer_seconds_rest" />
		</div>
		<div class="input-group">
			<label for="name">Active time(sec)</label>
			<input min="0" type="number" name="timer_seconds_active" />
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
