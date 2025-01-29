<script lang="ts">
	import { onDestroy, onMount, type Component, type Snippet } from 'svelte';
	import Dialog from '../Dialog.svelte';
	import {
		closeStackDialogNew,
		dialogStackNew,
		openStackDialogNew
	} from '../../../store/dialog-stack/dialogStackStoreNew';
	import { get } from 'svelte/store';

	('$lib/store/dialog-stack/dialogStackStore');

	let {
		children,
		fullScreen,
		maxWidth,
		isOpen = $bindable(false),
		id,
		PassedComponent,
		...rest
	}: {
		fullScreen?: boolean;
		isOpen?: boolean;
		children?: Snippet;

		maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		id?: string;
		PassedComponent?: Component;
	} = $props();
	let dialog: HTMLDialogElement | undefined = $state();
	const closeModal = () => {
		if (!dialog) return;
		if (dialog.classList.contains('fade-in')) return;
		console.log('closeModal is called');
		dialog.classList.remove('closing');
		dialog.removeEventListener('transitionend', closeModal);
		dialog.close();
		isOpen = false;
		closeStackDialogNew();
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
		console.log('onMount');
		if (dialog) {
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
		if (!dialog) return;
		if (isOpen) {
			setTimeout(() => {
				if (dialog) {
					dialog.showModal();
					dialog.classList.add('fade-in');
					dialog.addEventListener('transitionend', closeModal);
				}
			}, 0);
		}
		if (!isOpen) {
			closeStackDialogNew();
			dialog.close();
		}
	});

	onDestroy(() => {
		if (dialog) {
			// popDialog(); // Clean up when dialog is destroyed
			dialog.removeEventListener('keydown', handleEsc);
			console.log('onDestroy');
		}
	});
</script>

<Dialog {id} {fullScreen} {maxWidth} bind:dialog>
	{#if PassedComponent}
		<PassedComponent {...rest} />
	{:else if children}
		{@render children()}
	{:else}
		no children provided
	{/if}
</Dialog>
