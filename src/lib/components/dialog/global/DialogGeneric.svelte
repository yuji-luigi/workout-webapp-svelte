<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { dialogStore, type DialogStore } from '../../../store/global-dialog-store';
	import Dialog from '../Dialog.svelte';
	let {
		children,
		fullScreen,
		isOpen = $bindable()
	}: {
		fullScreen?: boolean;
		isOpen: boolean;
		children: any;
	} = $props();
	let dialog: HTMLDialogElement | undefined = $state();
	let dialogParams = $state<DialogStore | null>(null);
	const closeModal = () => {
		if (!dialog) return;
		if (dialog?.classList.contains('fade-in')) {
			return;
		}
		dialog.classList.remove('closing');
		dialog.removeEventListener('transitionend', closeModal);
		dialog.close();
		isOpen = false;
	};
	function handleCloseAnimation() {
		if (dialog) {
			dialog.classList.remove('fade-in');
			dialog.classList.add('closing');
		}
	}
	function handleEsc(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();

			handleCloseAnimation();
		}
	}

	onMount(() => {
		dialog?.addEventListener('keydown', handleEsc);
		dialog &&
			dialog.addEventListener(
				'click',
				async (e: MouseEvent) => {
					if (e.target === dialog) {
						handleCloseAnimation();
					}
				},
				true
			);
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
		document.removeEventListener('keydown', handleEsc);
	});
	dialogStore.subscribe((value) => {
		dialogParams = value;
	});
</script>

<Dialog {fullScreen} bind:dialog>
	<div>
		{#if children}
			{@render children()}
		{:else}
			no children provided
		{/if}
	</div>
</Dialog>
