<script lang="ts">
	import { onMount } from 'svelte';
	import { closeDialog, dialogStore, type DialogStore } from '../../../store/global-dialog-store';
	import Dialog from '../Dialog.svelte';
	import { sleep } from '../../../helpers/sleep';
	let dialog: HTMLDialogElement | null = $state(null);
	let dialogStoreParams: DialogStore | any = $state(null);
	dialogStore.subscribe((value) => (dialogStoreParams = value));

	async function handleEsc(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();
			handleCloseAnimation();
			// dialogStore.set({ isOpen: false });
		}
	}

	const closeModal = () => {
		if (!dialog) return;
		if (dialog.classList.contains('fade-in')) {
			return;
		}
		dialog.classList.remove('closing');
		dialog.removeEventListener('transitionend', closeModal);
		dialog.close();
		dialogStore.set({ isOpen: false });
	};

	function handleCloseAnimation() {
		if (dialog) {
			dialog.classList.remove('fade-in');
			dialog.classList.add('closing');
		}
	}

	onMount(() => {
		if (!dialog) return;
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
		dialog.addEventListener('keydown', handleEsc, true);
	});
	$effect(() => {
		if (dialog && $dialogStore.isOpen) {
			dialog.showModal();
			dialog.classList.add('fade-in');
			dialog.addEventListener('transitionend', closeModal);
		}
		if (dialog && !$dialogStore.isOpen) {
			dialog.close();
			// dialogStore.set({ isOpen: false });
		}
	});
</script>

<Dialog bind:dialog>
	<div class="">
		{#if dialogStoreParams?.componentInDialog}
			{@render dialogStoreParams.componentInDialog.component({
				...dialogStoreParams.componenetInDialog.props
			})}
			<!-- <svelte:component
				this={dialogStoreParams.componentInDialog.component}
				{...dialogStoreParams.componenetInDialog.props}
			/> -->
		{/if}
		{#if dialogStoreParams?.rawHtml}
			{@html dialogStoreParams.rawHtml}
		{/if}
	</div>
</Dialog>

<style>
</style>
