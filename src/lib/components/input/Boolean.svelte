<script lang="ts">
	import InputGroupGrid from './InputGroupGrid.svelte';

	let {
		name,
		className,
		label,
		input,
		...others
	}: {
		name: string;
		className?: string;
		label?: string;
		input?: any;
	} = $props();
	let checked = $state(false);
	$effect(() => {
		console.log({ checked });
	});
</script>

<InputGroupGrid {className} {label} {name} {...others}>
	{#snippet input()}
		<div>
			<input {...others} type="checkbox" bind:checked />
			<input type="hidden" {name} value={checked ? 'true' : 'false'} />
		</div>
	{/snippet}
</InputGroupGrid>

<style>
	div {
		margin-right: auto;
		margin-block: auto;
		display: flex;
	}
	input[type='hidden'] {
		display: none;
	}
</style>
