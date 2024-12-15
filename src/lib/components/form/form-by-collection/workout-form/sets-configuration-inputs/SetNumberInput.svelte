<script lang="ts">
	import { getContext } from 'svelte';
	import IconButton from '../../../../button/IconButton.svelte';
	let { name }: { name: string } = $props();

	let n_sets = $state<number>(1);
	let form = getContext('form');
</script>

<div class="flex-row">
	<IconButton onclick={() => (n_sets -= 1)}>﹣</IconButton>
	<span class="flex-row">
		<input value={n_sets} type="text" {name} />
		<p>sets</p>
	</span>
	<IconButton onclick={() => (n_sets += 1)}>+</IconButton>
</div>

<style>
	div.flex-row {
		display: flex;
		align-items: center;
		margin-left: auto;
	}
	input {
		width: 3rem;
		text-align: center;
		border: none;
		font-size: 2rem;
	}
	span {
		align-items: center;
		margin-inline: 0.5rem;
	}
</style>
