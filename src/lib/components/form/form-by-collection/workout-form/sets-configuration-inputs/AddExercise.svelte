<script lang="ts">
	let { onclick }: { onclick: () => void } = $props();
</script>

<button {onclick} type="button" class="input-section button">
	<h3>Add exercise</h3>
</button>

<style>
	.input-section {
		color: var(--text-color-white);
		display: grid;
		padding-inline: var(--padding-inline-lg);
		border-radius: var(--border-radius-lg);
		grid-template-columns: 1fr auto auto;
		padding-block: 2rem;
		gap: var(--spacing-sm);
		background-color: var(--gray-700);
	}
</style>
