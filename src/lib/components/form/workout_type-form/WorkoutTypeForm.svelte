<script lang="ts">
	import { sleep } from '../../../helpers/sleep';
	import { workout_typeY } from '../../../store/lofi-db/workout-lofi.svelte';
	// import { db_state } from '../../../store/lofi-db/workout-lofi.svelte';
	import { workoutTypeFormTable } from '../../../data/template-json/dataTable/workout_type-form-table-json';
	import JsonForm from '../JsonForm.svelte';

	const socket = new WebSocket('ws://localhost:1234');
	socket.addEventListener('open', () => {
		console.log('connected');
	});
	// save exercise + timer + joined workout
	async function handleSubmit(
		event: SubmitEvent & { target: HTMLFormElement },
		payload: Record<string, any>
	) {
		// const formData = new FormData(event.target as HTMLFormElement);
		try {
			console.log(payload);
			workout_typeY.push([payload as WorkoutType]);

			await sleep(750);
			event.target?.reset();
		} catch (error: any) {
			throw new Error(error);
		}
	}
</script>

<div class="container">
	<h3 class="title">Create new workout type</h3>

	<JsonForm formTableFields={workoutTypeFormTable} className="container" {handleSubmit} />
</div>

<style>
	.container {
		container-type: inline-size;
	}
</style>
