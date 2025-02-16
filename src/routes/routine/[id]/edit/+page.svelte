<script lang="ts">
	import type { RoutineJoined } from '$types/db/routine';
	import JsonForm from '$lib/components/form/JsonForm.svelte';
	import { routineFormTableJson } from '$lib/data/template-json/dataTable/routine-form-table-json';
	import {
		getFormIdCtx,
		setFormIdCtx,
		setFormTableJsonCtx
	} from '../../../../lib/store/form/form-context';
	import { getForm, setForm } from '../../../../lib/store/form/form-store.svelte';
	import { RoutineDexie } from '../../../../lib/db/dexie-db/orm/RoutineDexie';
	import { goto } from '$app/navigation';
	let { id, data }: { id: string; data: { routine: RoutineJoined } } = $props();
	const { routine } = data;
	const FORM_ID = 'routine-edit-form';
	setFormIdCtx(FORM_ID);
	setForm(FORM_ID, routine);

	setFormTableJsonCtx(routineFormTableJson);
	async function handleSubmit(
		event: SubmitEvent & { target: HTMLFormElement },
		payload: Record<string, any>
	) {
		event.preventDefault();

		const action = (event.submitter as HTMLButtonElement)?.dataset.action;
		if (action === 'edit') {
			payload.id = routine.id;
			RoutineDexie.update(payload as RoutineJoined);
		} else if (action === 'copy') {
			// only to make sure that the id is not set
			payload.id = undefined;
			const newRoutine = await RoutineDexie.add(payload as RoutineJoined);
			goto(`/routine/${newRoutine.id}/edit`);
		} else {
			console.log('Unknown action:', action);
		}
	}
</script>

<JsonForm formTableFields={routineFormTableJson} {handleSubmit}>
	{#snippet actions()}
		<div class="fullWidth flex-column button-div">
			<button class="button" type="submit" data-action="edit">Edit</button>
			<button class="button" type="submit" data-action="copy">Copy</button>
		</div>
	{/snippet}
</JsonForm>
