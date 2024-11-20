<script lang="ts">
	import FormGrid from '$lib/components/form/FormGrid.svelte';
	import InputGrid from '$lib/components/input/InputGrid.svelte';
	import WorkoutSelectMulti from '$lib/components/input/select-input/custom/WorkoutSelectMultiLabeled.svelte';
	import { sleep } from '$lib/helpers/sleep';

	let loading = false;
	const form_id = 'routine-form';

	async function handleSubmit(payload: Record<string, any>) {
		loading = true;
		console.log({ payload });
		await sleep(200);
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

		<WorkoutSelectMulti name="workouts" label="workouts" {form_id} />
		<button class="button primary">submit</button>
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
