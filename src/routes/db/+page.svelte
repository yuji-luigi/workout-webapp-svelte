<script lang="ts">
	import { app_state, yCounter } from '$lib/store/all_stores.svelte';
	import { createConnected } from '../../lib/store/socket-store.svelte';
	const connected = createConnected();
	const socket = new WebSocket('ws://localhost:1234');

	// Just to toggle the red green status emoji
	socket?.addEventListener('open', () => connected.setConnected(true));
	socket?.addEventListener('close', () => connected.setConnected(false));

	// Tells YJS to update the counter
	// This then updates the svelte state and updates the UI
	function onclick() {
		yCounter.set('value', app_state.counter + 1);
	}
</script>

<h1>Layout {app_state.counter}</h1>

<button on:click={onclick}>Click</button>

<p>
	Websocket connection status: {connected.value ? '🟢' : '🔴'}
</p>
