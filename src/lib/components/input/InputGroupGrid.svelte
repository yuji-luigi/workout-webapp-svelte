<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		className = '',
		label,
		input,
		hidden = false,
		name
	}: {
		hidden?: boolean;
		input?: Snippet;
		className?: string;
		label?: string;
		name: string;
	} = $props();
</script>

<div class={`input-group ${className} ${hidden ? 'input-group-hidden' : ''}`}>
	<label {hidden} for={name}>{label}</label>
	<div class="flex-column input-error-container" data-input-name={name}>
		{@render input?.()}
		<span class="error"></span>
	</div>
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
	.flex-column {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.error {
		margin-left: auto;
		color: red;
	}

	@container (max-width: 600px) {
		.input-group {
			gap: 0.25rem;
			justify-items: start;
			grid-column: 1/-1;
		}
	}
</style>
