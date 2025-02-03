<script lang="ts">
	import type { Snippet } from 'svelte';
	import blackBoardSrc from '$lib/assets/images/blackboard.jpg';

	let { children }: { children: Snippet } = $props();
</script>

<div style={`--image-src: url('${blackBoardSrc}')`} class="blackboard">
	{@render children()}
</div>

<style>
	.blackboard {
		overflow: hidden;
		background-image: var(--image-src);
		width: var(--width, 100%);
		height: var(--height, 100%);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
