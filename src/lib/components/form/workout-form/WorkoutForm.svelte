<script lang="ts">
	import FormGrid from '$lib/components/form/FormGrid.svelte';
	import InputGrid from '$lib/components/input/InputGrid.svelte';
	import ExerciseSelectMulti from '$lib/components/input/select-input/custom/ExerciseSelectMultiLabeled.svelte';
	import { sleep } from '$lib/helpers/sleep';
	import { setContext } from 'svelte';
	import SelectInputSingle from '../../input/select-input/base/SelectInputSingle.svelte';
	import SelectSingleGrid from '../../input/select-input/SelectSingleGrid.svelte';

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
	<h3>Create a new workout</h3>
	<FormGrid {handleSubmit} {loading} {form_id}>
		<InputGrid label="Name of the routine" name="name" type="text" />
		<SelectSingleGrid
			label="type of the workout"
			name="type"
			placeholder="Workout type"
			collection="workout_type"
		/>
		<InputGrid label="Slug of the routine(shown in url)" name="slug" type="text" />
		<InputGrid label="Description" name="description" type="text" />
		<InputGrid label="Image" name="image" type="file" />
		<ExerciseSelectMulti name="exercises" label="exercises" />
		<button class="button primary">submit</button>
	</FormGrid>
</div>

<style>
	.button {
		width: unset;
		margin-left: auto;
		grid-column: -1 / 1;
		margin-block: auto;
	}
</style>
