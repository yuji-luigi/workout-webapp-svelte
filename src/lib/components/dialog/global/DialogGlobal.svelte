<script lang="ts">
	import { onMount } from 'svelte';
	import { closeDialog, dialogStore, type DialogStore } from '../../../store/dialog-store';
	import Dialog from '../Dialog.svelte';
	let dialog: HTMLDialogElement;
	let dialogStoreParams: DialogStore;
	dialogStore.subscribe((value) => (dialogStoreParams = value));
	onMount(() => {
		dialog &&
			dialog.addEventListener(
				'click',
				(e) => {
					if (e.target === dialog) {
						dialog.classList.add('closing');
						closeDialog();
					}
				},
				true
			);
	});
	$: {
		if (dialog && $dialogStore.isOpen) {
			dialog.showModal();
		}
		if (dialog && !$dialogStore.isOpen) {
			dialog.close();
			dialog.classList.remove('closing');
		}
		// dialog && ($dialogStore.isOpen ? dialog.showModal() : dialog.close());
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
