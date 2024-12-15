<script lang="ts">
	import IconButton from '$components/button/IconButton.svelte';
	let { onclick }: { onclick: () => void } = $props();
</script>

<button {onclick} type="button">
	<div class="flex-row add-workout">
		<IconButton --margin="0 0 0 auto">+</IconButton>
		<h3 class="title">Add set</h3>
	</div>
</button>

<style>
	button {
		cursor: pointer;
		display: grid;
		grid-template-columns: minmax(150px, 200px) 1fr;
		place-items: center;
		place-content: center;
		background-color: var(--color-primary-800);
		padding-inline: var(--padding-inline-md);
		gap: var(--spacing-lg);
		border: var(--color-primary-600) solid 1.5px;
		padding-block: var(--padding-block-md);
		border-radius: var(--border-radius-lg);
		transition:
			background-color 0.2s,
			scale 0.2s;
		&:hover {
			background-color: var(--color-primary-700);
		}
		&:active {
			background-color: var(--color-primary-600);
			scale: 0.9;
		}
	}

	/* .exercise-config-sub-grid {
		grid-template-columns: subgrid;
		gap: var(--spacing-sm);
	} */
	.flex-row {
		/* justify-content: space-between; */
		gap: var(--spacing-md);
		align-items: center;
	}
</style>
