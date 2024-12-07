<script lang="ts">
	let {
		dialog = $bindable(),
		children,
		maxWidth = 'md'
	}: {
		maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
		children: any;
		dialog: HTMLDialogElement | undefined;
	} = $props();
	const maxWidths = {
		sm: '400px',
		md: '600px',
		lg: '800px',
		xl: '1000px'
	};
</script>

<dialog style={`--max-width: ${maxWidths[maxWidth]}`} class="dialog card" bind:this={dialog}>
	<div class="dialog-container">
		{@render children?.()}
	</div>
</dialog>

<style>
	dialog {
		--max-width: 600px;
		max-width: var(--max-width);
	}
	.card {
		padding: 0;
	}
</style>
