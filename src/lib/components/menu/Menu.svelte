<script lang="ts">
	import { lofi_db } from '../../store/lofi-db/lofi_db.svelte';
	import Button from '../button/Button.svelte';
	let {
		list,
		onclick
	}: {
		list: { title: string; description?: string; value?: string | number }[];
		onclick?: (data?: any) => void;
	} = $props();
	function handleClick(item: any) {
		onclick?.(item);
	}
</script>

<section class="menu-container">
	{#each list as item}
		<button onclick={() => handleClick(item)} class="button primary menu-item">
			<h3 class="center-item">{item.title}</h3>
		</button>
	{/each}
</section>

<style>
	button {
		display: grid;
		place-items: center;
		grid-template-columns: 1fr 1fr 1fr;
	}
	.center-item {
		white-space: nowrap;
		grid-column: 2;
		place-self: start;
	}

	.menu-container {
		display: flex;
		flex-direction: column;
		max-width: 400px;
		margin-inline: auto;
		gap: var(--spacing-sm);
	}
	.menu-container .menu-item {
		background-color: var(--color-primary-800);
		padding-inline: var(--padding-inline-md);
		padding-block: var(--padding-block-md);
		border-radius: var(--border-radius-lg);
	}
</style>
