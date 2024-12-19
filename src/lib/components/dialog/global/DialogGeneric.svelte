<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { dialogStore, type DialogStore } from '$lib/store/global-dialog-store';
	import Dialog from '../Dialog.svelte';
	import { dialogStack, pushDialog, popDialog, getTopDialog } from '$lib/store/dialogStackStore';

	let {
		children,
		fullScreen,
		maxWidth,
		isOpen = $bindable(false)
	}: {
		fullScreen?: boolean;
		isOpen: boolean;
		children: any;
		maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
	} = $props();

	let dialog: HTMLDialogElement | undefined = $state();
	let dialogParams = $state<DialogStore | null>(null);

	const closeModal = () => {
		if (!dialog) return;
		if (dialog.classList.contains('fade-in')) return;

		dialog.classList.remove('closing');
		dialog.removeEventListener('transitionend', closeModal);
		dialog.close();
		popDialog(); // Remove dialog from the stack
		isOpen = false;
	};

	function handleCloseAnimation() {
		if (dialog) {
			dialog.classList.remove('fade-in');
			dialog.classList.add('closing');
		}
	}

	async function handleEsc(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();
			handleCloseAnimation();
		}
	}

	onMount(() => {
		if (dialog) {
			pushDialog(dialog); // Add dialog to the stack
			dialog.addEventListener('keydown', handleEsc);
			dialog.addEventListener(
				'click',
				async (e: MouseEvent) => {
					if (e.target === dialog) {
						handleCloseAnimation();
					}
				},
				true
			);
		}
	});

	$effect(() => {
		if (dialog && isOpen) {
			dialog.showModal();
			dialog.classList.add('fade-in');
			dialog.addEventListener('transitionend', closeModal);
		}
		if (dialog && !isOpen) {
			dialog.close();
		}
	});

	onDestroy(() => {
		if (dialog) {
			popDialog(); // Clean up when dialog is destroyed
			dialog.removeEventListener('keydown', handleEsc);
		}
	});

	dialogStore.subscribe((value) => {
		dialogParams = value;
	});
</script>

<Dialog {handleEsc} {fullScreen} {maxWidth} bind:dialog>
	<div>
		{#if children}
			{@render children()}
		{:else}
			no children provided
		{/if}
	</div>
</Dialog>
