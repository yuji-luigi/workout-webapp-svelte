<script lang="ts">
	import Tooltip from '../../../../lib/components/Tooltip.svelte';
	import { workout } from '../../../../lib/data/template-json/dataTable';
	import type { RoutineJoined } from '../../../../types/db/routine';

	let { routine, currentSetIndex = 0 }: { routine: RoutineJoined; currentSetIndex: number } =
		$props();
</script>

<header class="set-stepper">
	{#each routine.workout_sets as set, index}
		<div class="step">
			<Tooltip
				tooltip={routine.workout_sets[index].exercises.map((exercise) => exercise.name).join(', ')}
			>
				<h3>Set {index + 1}</h3>
			</Tooltip>
			{#if index === currentSetIndex}
				↑
			{/if}
		</div>
		{#if index < routine.workout_sets.length - 1}
			<div class="step">
				<div class="line"></div>
			</div>
		{/if}
	{/each}
</header>

<style>
	.set-stepper {
		display: grid;
		grid-auto-flow: column;
		place-content: center;
		gap: 0.25rem;
	}
	.step {
		display: grid;
		flex-direction: column;
		place-items: center;
		place-content: center;
		grid-template-rows: 1fr 1fr;
	}
	.line {
		width: 20px; /* Adjust width for the line */
		height: 1px; /* Adjust height for the line */
		background-color: var(--line-color, #ccc); /* Use a variable for easy color theming */
	}
</style>
