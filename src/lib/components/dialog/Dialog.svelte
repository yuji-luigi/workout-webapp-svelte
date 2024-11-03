<script lang="ts">
	import { onDestroy } from 'svelte';
	let {
		dialog = $bindable(),
		children
	}: {
		children: any;
		dialog: HTMLDialogElement | undefined;
	} = $props();
</script>

<dialog class="dialog card" bind:this={dialog}>
	<div class="dialog-container">
		{@render children?.()}
	</div>
</dialog>

<style>
	dialog {
		max-width: 600px;
	}
	.card {
		padding: 0;
	}
</style>
