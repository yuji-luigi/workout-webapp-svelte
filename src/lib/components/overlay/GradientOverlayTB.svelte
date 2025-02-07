<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children, className = '' }: { children?: Snippet; className?: string } = $props();
</script>

<div class={`overlay-container ${className}`}>
	{@render children?.()}
	<div class="overlay"></div>
</div>

<style>
	.overlay-container {
		position: relative;
		width: 100%;
		height: fit-content;
		padding: var(--padding);
	}
	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0.8) 0%,
			rgba(0, 0, 0, 0.8) 60%,
			rgba(0, 0, 0, 0) 100%
		);
		z-index: -1;
	}
</style>
