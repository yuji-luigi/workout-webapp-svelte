<script lang="ts">
	import { onMount } from 'svelte';
	import { closeDialog, dialogStore, type DialogStore } from '../../../store/global-dialog-store';
	import Dialog from '../Dialog.svelte';
	import { sleep } from '../../../helpers/sleep';
	let dialog: HTMLDialogElement;
	let dialogStoreParams: DialogStore;
	dialogStore.subscribe((value) => (dialogStoreParams = value));

	const closeModal = () => {
		if (dialog.classList.contains('fade-in')) {
			return;
		}
		dialog.classList.remove('closing');
		dialog.removeEventListener('transitionend', closeModal);
		dialog.close();
	};

	function handleCloseAnimation() {
		if (dialog) {
			dialog.classList.remove('fade-in');
			dialog.classList.add('closing');
		}
	}

	onMount(() => {
		dialog &&
			dialog.addEventListener(
				'click',
				async (e) => {
					if (e.target === dialog) {
						handleCloseAnimation();
					}
				},
				true
			);
		dialog.addEventListener(
			'keydown',
			async (e) => {
				if (e.key === 'Escape') {
					e.preventDefault();
					handleCloseAnimation();
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
