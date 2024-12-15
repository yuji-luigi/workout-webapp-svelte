<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, ...props }: { children: Snippet } = $props();
</script>

<button type="button" class="primary button" {...props}>
	{@render children?.()}
</button>

<style>
	button {
		font-weight: 700;
		text-transform: uppercase;
	}
</style>
