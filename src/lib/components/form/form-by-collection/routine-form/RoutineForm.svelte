<script lang="ts">
	import { setContext } from 'svelte';
	import { routineFormTableJson } from '../../../../data/template-json/dataTable/routine-form-table-json';
	import { RoutineDexie } from '../../../../db/dexie-db/orm/RoutineDexie';
	import { sleep } from '../../../../helpers/sleep';
	import { routinesStore } from '../../../../store/states/routine_store.svelte';
	import JsonForm from '../../JsonForm.svelte';
	import { closeStackDialogNew } from '../../../../store/dialog-stack/dialogStackStoreNew';
	import { setFormIdCtx, setFormTableJsonCtx } from '../../../../store/form/form-context';

	setFormIdCtx('routine-form');
	setFormTableJsonCtx(routineFormTableJson);
	async function handleSubmit(
		_: SubmitEvent & { target: HTMLFormElement },
		payload: Record<string, any>
	) {
		try {
			const newRoutine = await RoutineDexie.add(payload as any);
			routinesStore.list = [...routinesStore.list, newRoutine];
			await sleep(500);
			closeStackDialogNew();
		} catch (error) {
			console.error(error);
		}
	}
</script>

<div class="container">
	<h3>Create a new Routine/Workout</h3>
	<JsonForm formTableFields={routineFormTableJson} {handleSubmit} />
</div>

<style>
	.container {
		display: flex;
		gap: 1rem;
	}
</style>
