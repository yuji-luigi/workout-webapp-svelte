<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		type = 'button',
		onclick,
		children
	}: {
		type?: HTMLButtonElement['type'];
		children: Snippet;
		onclick?: () => void;
	} = $props();
</script>

<button {onclick} class="primary button" {type}>
	{#if children}
		{@render children()}
	{:else}{''}{/if}
</button>

<style>
	.button {
		display: flex;
		justify-content: center;
		align-items: center;
		--font-size: 2rem;
		border-radius: 90rem;
		padding: 0;
		height: var(--font-size);
		width: var(--font-size);
		font-size: var(--font-size);
		margin: var(--margin);
		-webkit-user-select: none; /* Safari */
		-ms-user-select: none; /* IE 10 and IE 11 */
		user-select: none; /* Standard syntax */
	}
</style>
