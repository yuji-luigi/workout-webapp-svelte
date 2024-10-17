<script lang="ts">
	import FormGrid from '../../../lib/components/form/FormGrid.svelte';
	import RoutineForm from '../../../lib/components/form/RoutineForm.svelte';
	import InputGrid from '../../../lib/components/input/InputGrid.svelte';
	import { handle_array_form_data } from '../../../lib/helpers/handle-array-form-data';
	import { sleep } from '../../../lib/helpers/sleep';
	let loading = false;
	async function handleSubmit(event: SubmitEvent) {
		loading = true;
		const form_data = new FormData(event.target as HTMLFormElement);
		const dto = handle_array_form_data(form_data);
		console.log(dto);
		await sleep(2000);
		loading = false;
	}
</script>

<RoutineForm />
<FormGrid {handleSubmit} {loading}>
	<InputGrid label="TEST" name="name1" />
	<InputGrid label="TEST2" name="name2" />
	<InputGrid label="TEST3" name="name3" />

	<div class="fullWidth flex-column button-div">
		<button class="button primary form-button" disabled={loading} type="submit">Submit</button>
	</div>
</FormGrid>

<style>
	.fullWidth {
		grid-column: 1/-1;
	}

	.button {
		width: unset;
		margin-left: auto;
	}
</style>
