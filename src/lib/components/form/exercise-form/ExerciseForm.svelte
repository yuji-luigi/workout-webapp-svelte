<script lang="ts">
	import { sleep } from '../../../helpers/sleep';
	// import { db_state } from '../../../store/lofi-db/workout-lofi.svelte';
	import { exerciseFormTableJson } from '../../../data/template-json/dataTable';
	import JsonForm from '../JsonForm.svelte';
	import type { Exercise } from '../../../../types/db/exercise';
	import { exercisesY } from '../../../store/lofi-db/workout-lofi.svelte';
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

	const socket = new WebSocket('ws://localhost:1234');
	socket.addEventListener('open', () => {
		console.log('connected');
	});
	// save exercise + timer + joined workout
	async function handleSubmit(
		event: SubmitEvent & { target: HTMLFormElement },
		payload: Record<string, any>
	) {
		loading = true;
		try {
			exercisesY.push([payload as Exercise]);
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
