<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="blackboard">
	{@render children()}
</div>

<style>
	.blackboard {
		background-image: url('/images/blackboard.jpg');
		width: var(--width,);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
