<script lang="ts">
	let {
		dialog = $bindable(),
		children,
		maxWidth,
		fullScreen
		// handleEsc
	}: {
		maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
		children: any;
		fullScreen?: boolean;
		// handleEsc: (e: KeyboardEvent) => void;

		dialog: HTMLDialogElement | undefined | null;
	} = $props();
	const maxWidths = {
		sm: '400px',
		md: '600px',
		lg: '1000px',
		xl: '1400px'
	};

	let style = fullScreen
		? `--max-width: 100vw; --max-height: 100vh`
		: maxWidth && `--max-width: ${maxWidths[maxWidth]}`;
</script>

<dialog {style} class="dialog card" bind:this={dialog}>
	<div class="dialog-container">
		{@render children?.()}
	</div>
</dialog>

<style>
	dialog {
		/* --max-width: 600px; */
		/* height: var(--height, 100%); */
		/* width: var(--width, 100%); */
		max-width: var(--max-width);
	}
	.card {
		padding: 0;
	}
</style>
