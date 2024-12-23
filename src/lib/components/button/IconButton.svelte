<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		type = 'button',
		onclick,
		children,
		className = '',
		disabled = false,
		isDiv = false
	}: {
		type?: HTMLButtonElement['type'];
		children: Snippet;
		className?: string;
		isDiv?: boolean;
		disabled?: boolean;
		onclick?: () => void;
	} = $props();
	console.log('type', className);
</script>

{#if isDiv}
	<div class={`primary button ${disabled ? 'disabled' : ''} ${className}`}>
		{#if children}
			{@render children()}
		{:else}{''}{/if}
	</div>
{:else}
	<button {disabled} {onclick} class={`primary button  ${className}`} {type}>
		{#if children}
			{@render children()}
		{:else}{''}{/if}
	</button>
{/if}

<style>
	.button {
		--font-size-local: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 90rem;
		padding: var(--padding, 0);
		height: var(--font-size, var(--font-size-local));
		width: var(--font-size, var(--font-size-local));
		font-size: var(--font-size, var(--font-size-local));
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
