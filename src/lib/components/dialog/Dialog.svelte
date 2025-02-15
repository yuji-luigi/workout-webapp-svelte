<script lang="ts">
	import { onMount } from 'svelte';

	let {
		dialog = $bindable(),
		children,
		maxWidth,
		fullScreen,
		id = ''
		// handleEsc
	}: {
		maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		children: any;
		fullScreen?: boolean;
		id?: string;
		// handleEsc: (e: KeyboardEvent) => void;

		dialog?: HTMLDialogElement | undefined | null;
	} = $props();
	const maxWidths = {
		xs: '300px',
		sm: '400px',
		md: '600px',
		lg: '1000px',
		xl: '1400px'
	};

	let contentsEl: HTMLDivElement | undefined = $state();

	let style = fullScreen
		? `--max-width: 100vw; --max-height: 100vh`
		: maxWidth
			? `--max-width: ${maxWidths[maxWidth]}`
			: '';

	onMount(() => {
		if (!contentsEl || !dialog) return;

		setTimeout(() => {
			if (contentsEl && dialog) {
				contentsEl.scrollTop = 0;
				dialog.scrollTop = 0;
			}
		}, 100);
	});
</script>

<dialog {style} {id} class="dialog card" bind:this={dialog}>
	<div bind:this={contentsEl} class="dialog-contents">
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
</style>
