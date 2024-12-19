<script lang="ts">
	import { lofi_db } from '../../store/lofi-db/lofi_db.svelte';
	import Button from '../button/Button.svelte';
	const exercises = lofi_db.db_state.exercises;
</script>

<section class="menu-container">
	{#each exercises as exercise}
		<button class="button primary menu-item">
			<h3>{exercise.name}</h3>
		</button>
	{/each}
</section>

<style>
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
