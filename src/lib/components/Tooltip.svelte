<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		tooltip
	}: {
		children: Snippet;
		tooltip: string;
	} = $props();
</script>

<div class="tooltip">
	{@render children()}
	<span class="tooltiptext">{tooltip}</span>
</div>

<style>
	.tooltip {
		position: relative;
		display: inline-block;
		border-bottom: 1px dotted black;
	}

	.tooltip .tooltiptext {
		visibility: hidden;
		width: 120px;
		background-color: var(--gray-400);
		color: #fff;
		text-align: center;
		border-radius: 6px;
		padding: 5px 0;

		/* Position the tooltip */
		position: absolute;
		z-index: 1;
		top: 100%;
		left: 50%;
		transform: translate(-50%, 10px);
		opacity: 0; /* Start invisible */
		transition:
			opacity 0.3s ease,
			transform 0.3s ease; /* Smooth transition */
	}

	.tooltip:hover .tooltiptext {
		visibility: visible;
		transform: translate(-50%, 0);
		opacity: 1; /* Make visible */
	}
</style>
