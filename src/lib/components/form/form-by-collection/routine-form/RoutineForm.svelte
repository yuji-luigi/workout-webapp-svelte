<script lang="ts">
	import { setContext } from 'svelte';
	import { routineFormTableJson } from '../../../../data/template-json/dataTable/routine-form-table-json';
	import { Routine } from '../../../../db/dexie-db/Routine';
	import { sleep } from '../../../../helpers/sleep';
	import { setFormId } from '../../../../store/form-store.svelte';
	import { closeDialog } from '../../../../store/global-dialog-store.svelte';
	import { routinesStore } from '../../../../store/states/routine_store.svelte';
	import JsonForm from '../../JsonForm.svelte';

	setFormId('routine-form');
	setContext('form_table_json', routineFormTableJson);
	async function handleSubmit(
		_: SubmitEvent & { target: HTMLFormElement },
		payload: Record<string, any>
	) {
		try {
			const newRoutine = await Routine.add(payload as any);
			routinesStore.list = [...routinesStore.list, newRoutine];
			await sleep(500);
			closeDialog();
		} catch (error) {
			console.error(error);
		}
	}
</script>

<div class="container">
	<h3>Create a new Routine/Workout</h3>
	<JsonForm formTableFields={routineFormTableJson} {handleSubmit} />
</div>
