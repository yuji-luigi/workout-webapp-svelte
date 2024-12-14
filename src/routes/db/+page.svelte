<script lang="ts">
	import { app_state, yCounter } from '$lib/store/all_stores.svelte';
	import { json } from '@sveltejs/kit';
	import FormGrid from '../../lib/components/form/FormGrid.svelte';
	import InputGrid from '../../lib/components/input/InputGrid.svelte';
	import { handleArrayFormData } from '../../lib/helpers/form-helper/handle-array-form-data';
	import { sleep } from '../../lib/helpers/sleep';
	import { db_state } from '../../lib/store/lofi-db/lofi_db.svelte';
	import { createWebsocketStates } from '../../lib/store/socket-store.svelte';
	import type { Workout } from '../../types/db/workout';
	const connected = createWebsocketStates();
	const socket = new WebSocket('ws://localhost:1234');
	// Just to toggle the red green status emoji
	socket?.addEventListener('open', () => connected.setConnected(true));
	socket?.addEventListener('close', () => connected.setConnected(false));
	let inputEl: HTMLInputElement;

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const data = handleArrayFormData(formData);
		await sleep(2000);
	}
	// Tells YJS to update the counter
	// This then updates the svelte state and updates the UI
	function onclick() {
		yCounter.set('value', app_state.counter + 1);
	}
</script>

<h1>Layout {app_state.counter}</h1>

<button {onclick}>Click</button>
<FormGrid {handleSubmit}>
	<InputGrid label="Exercise name" name="name" type="text" />
	<InputGrid label="Description" name="description" type="text" />
	<InputGrid label="Type" name="type" type="text" />
	<button class="primary button">ok</button>
</FormGrid>

<input bind:this={inputEl} type="text" />
<pre>
  {JSON.stringify(db_state.workoutLocal || '', null, 4)}
</pre>
<p>
	Websocket connection status: {connected.value ? '🟢' : '🔴'}
</p>
