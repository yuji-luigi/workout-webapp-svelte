<script lang="ts">
	import { onDestroy } from 'svelte';
	export let dialog: HTMLDialogElement;
</script>

<dialog class="dialog card" bind:this={dialog}>
	<div class="dialog-container">
		<slot />
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
