<script lang="ts">
	export let dialog: HTMLDialogElement;
</script>

<dialog class="dialog" bind:this={dialog}>
	<div class="dialog-container">
		<slot />
	</div>
</dialog>

<style>
	dialog {
		max-width: 600px;
		background-color: var(--fg);
		border: none;
	}
</style>
