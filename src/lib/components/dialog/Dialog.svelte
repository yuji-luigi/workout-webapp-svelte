<script lang="ts">
	let {
		dialog = $bindable(),
		children,
		maxWidth,
		fullScreen
		// handleEsc
	}: {
		maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		children: any;
		fullScreen?: boolean;
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

	let style = fullScreen
		? `--max-width: 100vw; --max-height: 100vh`
		: maxWidth && `--max-width: ${maxWidths[maxWidth]}`;
</script>

<dialog {style} class="dialog card" bind:this={dialog}>
	<div class="dialog-contents">
		{@render children?.()}
	</div>
</dialog>

<style>
	dialog {
		/* --max-width: 600px; */
		/* height: var(--height, 100%); */
		/* width: var(--width, 100%); */
		max-width: var(--max-width);
		@media (max-width: 600px) {
			max-width: 100%;
		}
	}
</style>
