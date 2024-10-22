<script lang="ts">
	import { onMount } from 'svelte';
	import { closeDialog, dialogStore, type DialogStore } from '../../../store/dialog-store';
	import Dialog from '../Dialog.svelte';
	import { sleep } from '../../../helpers/sleep';
	let dialog: HTMLDialogElement;
	let dialogStoreParams: DialogStore;
	dialogStore.subscribe((value) => (dialogStoreParams = value));

	const closeModal = () => {
		if (dialog.classList.contains('fade-in')) {
			return;
		}
		dialog.removeEventListener('transitionend', closeModal);
		dialog.close();
	};

	onMount(() => {
		dialog &&
			dialog.addEventListener(
				'click',
				async (e) => {
					if (e.target === dialog) {
						dialog.classList.remove('fade-in');
					}
				},
				true
			);
	});
	$: {
		if (dialog && $dialogStore.isOpen) {
			dialog.showModal();
			dialog.classList.add('fade-in');
			dialog.addEventListener('transitionend', closeModal);
		}
		if (dialog && !$dialogStore.isOpen) {
			dialog.close();
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
