<script lang="ts">
	import { closeDialog, dialogStore, type DialogStore } from '../../../store/dialog-store';
	import Dialog from '../Dialog.svelte';
	let dialog: HTMLDialogElement;
	let dialogStoreParams: DialogStore;
	dialogStore.subscribe((value) => (dialogStoreParams = value));

	$: {
		dialog && ($dialogStore.isOpen ? dialog.showModal() : dialog.close());
		dialog &&
			dialog.addEventListener(
				'click',
				(e) => {
					if (e.target === dialog) {
						closeDialog();
					}
				},
				true
			);
	}
</script>

<Dialog bind:dialog>
	<div>
		{#if dialogStoreParams?.componentInDialog}
			<svelte:component
				this={dialogStoreParams.componentInDialog.component}
				{...dialogStoreParams.componentInDialog.props}
			/>
		{/if}
		{#if dialogStoreParams?.rawHtml}
			{@html dialogStoreParams.rawHtml}
		{/if}
	</div>
</Dialog>
