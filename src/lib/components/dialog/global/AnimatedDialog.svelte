<!--
@component
- Modal component that animates in and out.AnimatedDialog
- TODO: when the isOpen state is controlled from outside the component, the dialog will close without animation. need to fix this.
@example
```svelte
<Repeat text="Repeat this" numberOfTimes={3} />
```
-->
<script lang="ts">
	import { onDestroy, onMount, type Component, type Snippet } from 'svelte';
	import Dialog from '../Dialog.svelte';

	('$lib/store/dialog-stack/dialogStackStore');

	let {
		children,
		fullScreen,
		maxWidth,
		isOpen = $bindable(false),
		id,
		closeStackDialogCB
	}: {
		fullScreen?: boolean;
		isOpen?: boolean;
		children?: Snippet;
		closeStackDialogCB?: () => void;
		maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		id?: string;
	} = $props();
	let dialog: HTMLDialogElement | undefined = $state();
	const closeModal = () => {
		if (!dialog) return;
		if (dialog.classList.contains('fade-in')) return;
		dialog.classList.remove('closing');
		dialog.removeEventListener('transitionend', closeModal);
		dialog.close();
		closeStackDialogCB?.();
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
		console.log({ isOpen });
		if (!dialog) return;
		if (isOpen) {
			if (dialog) {
				dialog.showModal();
				dialog.classList.add('fade-in');
				dialog.addEventListener('transitionend', closeModal);
			}
		}
		if (!isOpen) {
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
	{#if children}
		{@render children()}
	{:else}
		no children provided
	{/if}
</Dialog>
