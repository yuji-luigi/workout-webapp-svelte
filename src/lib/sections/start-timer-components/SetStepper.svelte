<script lang="ts">
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { RoutineJoined } from '$types/db/routine';
	import { getRoutineTimer } from '$lib/store/timers/routine_timer.svelte';
	import { getIntervalTimer } from '$lib/store/timers/interval_timer.svelte';
	import { exercise } from '$lib/data/template-json/dataTable';
	// let {
	// 	routine,
	// 	currentSetIndex = 0,
	// 	currentExerciseIndex = 0
	// }: {
	// 	routine: RoutineJoined;
	// 	currentSetIndex: number;
	// 	currentExerciseIndex: number | null;
	// } = $props();
	let routineTimer = getRoutineTimer();
	const intervalTimer = getIntervalTimer();
</script>

<header class="set-stepper">
	set {intervalTimer.currentFlow.set_index + 1}
	{#if 'exercise' in intervalTimer.currentFlow}
		{intervalTimer.currentFlow.exercise.name}
	{:else}
		rest time
	{/if}

	<!-- {#each routineTimer.routine.blocks || [] as set, index}
		<div class="step" data-active={index === routineTimer.currentSetIndex}>
			<div class="flex-column">
				<Tooltip tooltip={set.type.name}>
					<h3 class="set-index">Set {index + 1} x{set.n_set}</h3>
				</Tooltip>
				<div>
					<ul>
						{#each set.exercises as exercise, index}
							<li class="exercise-item" data-active={index === routineTimer.currentExerciseIndex}>
								{exercise.name}
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>

	{/each} -->
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
