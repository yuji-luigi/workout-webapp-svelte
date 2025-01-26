<script lang="ts">
	import { sleep } from '$lib/helpers/sleep';

	import type { Exercise } from '$types/db/exercise';
	import { exerciseFormTableJson } from '$lib/data/template-json/dataTable';
	// import { dexie_db.exercises.add/lofi-yjs-db/dexie_db.exercises.addt JsonForm from '$lib/components/form/JsonForm.svelte';
	import { dexie_db } from '../../../../db/dexie-db/dexie-adaptor';
	let {
		onSubmitCallback,
		resolve,
		reject
	}: {
		resolve?: (param: any) => void;
		reject?: (param: any) => void;
		onSubmitCallback?: (formData: any) => void;
	} = $props() as any;
	let loading = $state(false);

	// save exercise + interval + joined workout
	async function handleSubmit(
		event: SubmitEvent & { target: HTMLFormElement },
		payload: Record<string, any>
	) {
		loading = true;
		try {
			dexie_db.exercises.add(payload as Exercise);
			await sleep(750);
			event.target?.reset();
			onSubmitCallback && onSubmitCallback(payload);
		} catch (error: any) {
			throw new Error(error);
		}
		loading = false;
	}
</script>

<div class="container">
	<h3 class="title">Create new exercise</h3>
	<JsonForm formTableFields={exerciseFormTableJson} className="container" {handleSubmit} />
</div>

<style>
	.container {
		container-type: inline-size;
	}

	label {
		white-space: nowrap;
	}
	input {
		width: 100%;
	}

	@container (max-width: 600px) {
		.input-group {
			gap: 0.25rem;
			justify-items: start;
			grid-column: 1/-1;
		}
	}
</style>
