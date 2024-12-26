<script lang="ts">
	import FormGrid from '$lib/components/form/FormGrid.svelte';
	import InputGrid from '$lib/components/input/InputGrid.svelte';
	import { handleArrayFormData } from '$lib/helpers/form-helper/handle-array-form-data';
	import { sleep } from '$lib/helpers/sleep';
	import RoutineForm from '../../../lib/components/form/form-by-collection/routine-form/RoutineForm.svelte';
	let loading = false;
	async function handleSubmit(event: SubmitEvent) {
		loading = true;
		const form_data = new FormData(event.target as HTMLFormElement);
		const dto = handleArrayFormData(form_data);
		console.log(dto);
		await sleep(2000);
		loading = false;
	}
</script>

<RoutineForm />

<style>
</style>
