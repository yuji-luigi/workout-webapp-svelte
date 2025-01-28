<script lang="ts">
	import { onMount } from 'svelte';
	import { closeStackDialogNew } from '../../store/dialog-stack/dialogStackStoreNew';

	let {
		dialog = $bindable(),
		children,
		maxWidth,
		fullScreen,
		id,
		...rest
		// handleEsc
	}: {
		maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		children: any;
		fullScreen?: boolean;
		// handleEsc: (e: KeyboardEvent) => void;
		dialog?: HTMLDialogElement | undefined | null;
		rest?: any;
		// TODO: create an object to pass the dialog config props or create a getStackDialogProps helper in stackDialogStoreNew
		id: string;
	} = $props();
	const maxWidths = {
		xs: '300px',
		sm: '400px',
		md: '600px',
		lg: '1000px',
		xl: '1400px'
	};

	let style = fullScreen
		? `--max-width: 100vw; --max-height: 100vh`
		: maxWidth && `--max-width: ${maxWidths[maxWidth]}`;
	function handleClickOutside(e: MouseEvent) {
		console.log('hey');
		if (e.target === dialog) {
			closeStackDialogNew();
		}
	}
	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			closeStackDialogNew();
		}
	}
	onMount(() => {
		console.log('StackDialog', dialog);
		if (dialog) {
			dialog.showModal();
			setTimeout(() => {
				if (dialog) {
					dialog.scrollTop = 0;
					dialog.addEventListener('click', handleClickOutside);
					dialog.addEventListener('keydown', handleKeyDown);
				}
			});
		}
	});
</script>

<dialog {style} class="dialog card" {id} bind:this={dialog}>
	<div class="dialog-contents">
		{@render children?.()}
	</div>
</dialog>

<style>
	dialog {
		max-width: var(--max-width);
		@media (max-width: 600px) {
			max-width: 100%;
		}
	}
	.dialog-contents {
		height: fit-content;
	}
</style>
