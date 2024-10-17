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

<style>
</style>
