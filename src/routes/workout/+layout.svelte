<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { createWebsocketStates } from '../../lib/store/socket-store.svelte';
	let { children }: { children: Snippet } = $props();
	const socketStates = createWebsocketStates();
	let isConnectedWS = $state(false);
	onMount(() => {
		if (socketStates.isConnected) {
			isConnectedWS = true;
		}
	});
	$effect(() => {
		if (socketStates.isConnected) {
			isConnectedWS = true;
		}
	});
</script>

{#if isConnectedWS}
	{@render children()}
{:else}
	<p>Loading screen</p>
{/if}
