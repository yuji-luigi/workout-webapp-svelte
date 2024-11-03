<script lang="ts">
	import { onMount } from 'svelte';
	import { dialogStore } from '../../../store/dialog-store';
	import Dialog from '../Dialog.svelte';
	let {
		children,
		dialog = $bindable(),
		isOpen = $bindable()
	}: {
		isOpen: boolean;
		children: any;
		dialog: HTMLDialogElement | undefined;
	} = $props();

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

	onMount(() => {
		dialog &&
			dialog.addEventListener(
				'click',
				async (e) => {
					if (e.target === dialog) {
						dialog.classList.remove('fade-in');
						dialog.classList.add('closing');
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
</script>

<Dialog bind:dialog>
	<div>
		{#if children}
			{@render children()}
		{:else}
			no children provided
		{/if}
	</div>
</Dialog>
