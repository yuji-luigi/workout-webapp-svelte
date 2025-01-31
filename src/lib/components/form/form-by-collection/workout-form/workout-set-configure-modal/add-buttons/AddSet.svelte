<script lang="ts">
	import IconButton from '$components/button/IconButton.svelte';
	let { onclick, disabled = false }: { onclick: () => void; disabled?: boolean } = $props();
</script>

<button
	{disabled}
	{onclick}
	type="button"
	class="add-set-card button-primary-reactive-color button-reactive-size"
>
	<div class="flex-row add-workout">
		<IconButton {disabled} isDiv --margin="0 0 0 auto">+</IconButton>
		<h3 class="title">Add set</h3>
	</div>
</button>

<style>
	.add-set-card {
		cursor: pointer;
		display: flex;
		justify-content: center;
		max-width: 350px;
		width: 100%;
		color: var(--text-color);
		/* background-color: var(--color-primary-800); */
		padding-inline: var(--padding-inline-md);
		gap: var(--spacing-lg);
		border: var(--color-primary-600) solid 1.5px;
		padding-block: var(--padding-block-md);
		border-radius: var(--border-radius-lg);
		transition:
			background-color 0.2s,
			scale 0.2s;

		&:disabled {
			border: light-dark(var(--gray-200), var(--gray-400)) solid 1.5px;
			background: light-dark(var(--gray-200), var(--gray-400));
			cursor: not-allowed;
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
