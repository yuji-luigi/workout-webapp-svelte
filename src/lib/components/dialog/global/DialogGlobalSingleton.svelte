<script lang="ts">
	import { onMount } from 'svelte';
	import {
		closeDialog,
		dialogStore,
		type DialogStore
	} from '../../../store/global-dialog-store.svelte';
	import Dialog from '../Dialog.svelte';
	let dialog: HTMLDialogElement | null = $state(null);
	// dialogStore.subscribe((value) => (dialogStoreParams = value));

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
		dialogStore.isOpen = false;
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
		if (dialog && dialogStore.isOpen) {
			dialog.showModal();
			dialog.classList.add('fade-in');
			dialog.addEventListener('transitionend', closeModal);
		}
		if (dialog && !dialogStore.isOpen) {
			dialog.close();
			// dialogStore.set({ isOpen: false });
		}
	});
	// console.log(dialogStore?.componentInDialog?.props);
</script>

<Dialog bind:dialog>
	<div class="">
		{#if dialogStore?.componentInDialog && dialogStore?.componentInDialog.component}
			{@render dialogStore.componentInDialog.component?.({ name: 'insane' })}
			<!-- <svelte:component
				this={dialogStore.componentInDialog.component}
				{...dialogStore.componenetInDialog.props}
			/> -->
		{/if}
		{#if dialogStore?.rawHtml}
			{@html dialogStore.rawHtml}
		{/if}
	</div>
</Dialog>

<style>
</style>
