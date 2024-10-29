<script lang="ts">
	import FormGrid from '../../../lib/components/form/FormGrid.svelte';
	import RoutineForm from '../../../lib/components/form/routine-form/RoutineForm.svelte';
	import InputGrid from '../../../lib/components/input/InputGrid.svelte';
	import { createFormDataToObject } from '../../../lib/helpers/handle-array-form-data';
	import { sleep } from '../../../lib/helpers/sleep';
	import { db_state, routinesY } from '../../../lib/store/lofi-db/workout-lofi.svelte';
	let loading = false;
	async function handleSubmit(event: SubmitEvent) {
		loading = true;
		const form_data = new FormData(event.target as HTMLFormElement);
		const dto = createFormDataToObject(form_data);
		console.log(dto);
		await sleep(2000);
		loading = false;
	}
</script>

<RoutineForm />
<table>
	<tbody>
		<tr>
			<th>name</th>
			<th>id</th>
		</tr>
		{#each db_state.routines as routine}
			<tr>
				<td>{routine.exercise_name}</td>
				<td>{routine.id}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
</style>
