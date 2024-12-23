<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		className = '',
		...props
	}: { children: Snippet; className?: string; onclick?: () => void } = $props();
</script>

<button type="button" class={`primary button ${className}`} {...props}>
	{@render children?.()}
</button>

<style>
	button {
		font-weight: 700;
		text-transform: uppercase;
	}
</style>
