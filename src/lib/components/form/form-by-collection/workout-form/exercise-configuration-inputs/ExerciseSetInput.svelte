<script lang="ts">
	import { getContext } from 'svelte';
	let { name }: { name: string } = $props();

	let n_sets = $state(1);
	let form = getContext('form');
</script>

<div class="input-group">
	<input value={n_sets} type="text" {name} />
	<span> Sets</span>
</div>

<style>
	.input-group {
		display: grid;
		grid-column: 1/-1;
		grid-template-columns: subgrid;
		justify-content: end;
		align-items: center;
		gap: var(--spacing-sm);
		font-size: var(--font-size-md);
		justify-items: end;
		cursor: pointer;
	}
	input {
		width: 3rem;
		text-align: center;
		border: none;
	}
</style>
