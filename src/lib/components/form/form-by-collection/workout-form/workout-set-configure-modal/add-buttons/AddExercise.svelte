<script lang="ts">
	import AddExerciseDialog from '../../../../../../../routes/workout/AddExerciseDialog.svelte';
	import type { ExerciseJoined } from '../../../../../../../types/db/exercise';
	import { openStackDialog } from '../../../../../../store/dialog-stack/dialogStackStore';

	let { onclick }: { onclick: (exercise: ExerciseJoined) => void } = $props();
	async function handleClick() {
		const data = await new Promise((resolve, reject) => {
			openStackDialog({
				component: AddExerciseDialog as any,
				props: { resolve, reject }
			});
		});
		if (data) {
			onclick(data as ExerciseJoined);
		}
	}
</script>

<button onclick={handleClick} type="button" class="input-section button">
	<h3>Add exercise</h3>
</button>

<!-- <AnimatedDialog maxWidth="sm" bind:isOpen><ExerciseMenu /></AnimatedDialog> -->

<style>
	button {
		color: var(--text-color-white);
		display: grid;
		padding-inline: var(--padding-inline-lg);
		border-radius: var(--border-radius-lg);
		grid-template-columns: 1fr auto auto;
		padding-block: 2rem;
		background-color: var(--gray-700);
	}
</style>
