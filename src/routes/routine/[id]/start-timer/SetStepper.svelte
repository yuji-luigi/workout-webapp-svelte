<script lang="ts">
	import Tooltip from '../../../../lib/components/Tooltip.svelte';
	import type { RoutineJoined } from '../../../../types/db/routine';

	let {
		routine,
		currentSetIndex = 0,
		currentExerciseIndex = 0
	}: {
		routine: RoutineJoined;
		currentSetIndex: number;
		currentExerciseIndex: number | null;
	} = $props();
</script>

<header class="set-stepper">
	{#each routine.workout_sets as set, index}
		<div class="step" data-active={index === currentSetIndex}>
			<div class="flex-column">
				<Tooltip tooltip={routine.workout_sets[index].type.name}>
					<h3 class="set-index">Set {index + 1}</h3>
				</Tooltip>
				<div>
					<ul>
						{#each routine.workout_sets[index].exercises as exercise, index}
							<li class="exercise-item" data-active={index === currentExerciseIndex}>
								{exercise.name}
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<!-- {#if index === currentSetIndex}
				↑
			{/if} -->
		</div>
		<!-- {#if index < routine.workout_sets.length - 1}
			<div class="step">
				<div class="line"></div>
			</div>
		{/if} -->
	{/each}
</header>

<style>
	.set-stepper {
		display: grid;
		grid-auto-flow: column;
		place-content: center;
		place-items: start;
		gap: 2.25rem;
	}
	.set-index {
		font-size: 1.5rem;
	}
	.step {
		display: grid;
		flex-direction: column;
		place-items: center;
		place-content: center;
		grid-template-rows: 1fr 1fr;
		&[data-active='true'] {
			opacity: 1;
			.exercise-item {
				&[data-active='true'] {
					font-weight: bold;
					font-size: var(--font-size-lg);

					color: var(--color-primary);
				}
			}
		}
		&[data-active='false'] {
			opacity: 0.6;
		}
	}

	.line {
		width: 20px; /* Adjust width for the line */
		height: 1px; /* Adjust height for the line */
		background-color: var(--line-color, #ccc); /* Use a variable for easy color theming */
	}
</style>
