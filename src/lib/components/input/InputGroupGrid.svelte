<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		className = '',
		label,
		input,
		hidden = false
	}: {
		hidden?: boolean;
		input?: Snippet;
		className?: string;
		label?: string;
	} = $props();
</script>

<div class={`input-group ${className} ${hidden ? 'input-group-hidden' : ''}`}>
	<label {hidden} for="name">{label}</label>
	{@render input?.()}
</div>

<style>
	.input-group {
		display: grid;
		grid-column: span 2;
		gap: 0.5rem;
		grid-template-columns: subgrid;
		grid-auto-flow: dense;
		align-items: baseline;
		justify-items: end;
	}
	.input-group-hidden {
		display: none;
	}

	@container (max-width: 600px) {
		.input-group {
			gap: 0.25rem;
			justify-items: start;
			grid-column: 1/-1;
		}
	}
</style>
