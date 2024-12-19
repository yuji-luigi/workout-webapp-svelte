<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		type = 'button',
		onclick,
		children,
		disabled = false,
		isDiv = false
	}: {
		type?: HTMLButtonElement['type'];
		children: Snippet;
		isDiv?: boolean;
		disabled?: boolean;
		onclick?: () => void;
	} = $props();
</script>

{#if isDiv}
	<div class={`primary button ${disabled ? 'disabled' : ''}`}>
		{#if children}
			{@render children()}
		{:else}{''}{/if}
	</div>
{:else}
	<button {disabled} {onclick} class="primary button" {type}>
		{#if children}
			{@render children()}
		{:else}{''}{/if}
	</button>
{/if}

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
		&.disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}
	}
</style>
