<script lang="ts">
	import { sleep } from '$lib/helpers/sleep';
	import { lofi_db } from '$lib/store/lofi-db/lofi_db.svelte';
	// import { db_state } from '$lib/store/lofi-db/workout-lofi.svelte';
	import { workoutTypeFormTable } from '$lib/data/template-json/dataTable/workout_set_type-form-table-json';
	import JsonForm from '$lib/components/form/JsonForm.svelte';

	// const socket = new WebSocket('ws://localhost:1234');
	// socket.addEventListener('open', () => {
	// 	console.log('connected');
	// });
	// save exercise + timer + joined workout
	async function handleSubmit(
		event: SubmitEvent & { target: HTMLFormElement },
		payload: Record<string, any>
	) {
		// const formData = new FormData(event.target as HTMLFormElement);
		try {
			console.log(payload);
			lofi_db.workout_set_typeY.push([payload as WSetType]);

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
