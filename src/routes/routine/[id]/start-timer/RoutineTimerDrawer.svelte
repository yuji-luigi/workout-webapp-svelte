<script lang="ts">
	import Tooltip from '../../../../lib/components/Tooltip.svelte';
	import type { RoutineJoined } from '../../../../types/db/routine';

	let { routine }: { routine: RoutineJoined } = $props();
	let isOpen = $state(false);
</script>

<button onclick={() => (isOpen = !isOpen)}>toggle</button>
<section class="routine-timer-drawer" data-open={isOpen}>
	<button onclick={() => (isOpen = !isOpen)}>toggle</button>
	<header class="set-stepper">
		{#each routine.workout_sets as set, index}
			<div class="step">
				<Tooltip
					tooltip={routine.workout_sets[index].exercises
						.map((exercise) => exercise.name)
						.join(', ')}
				>
					<h3>Set {index + 1}</h3>
				</Tooltip>
			</div>
			{#if index < routine.workout_sets.length - 1}
				<div class="step">
					<div class="line"></div>
				</div>
			{/if}
		{/each}
	</header>
</section>

<style>
	.routine-timer-drawer {
		margin-top: var(--sub-header-height);
		&[data-open='false'] {
			translate: -100% 0%;
		}
		&[data-open='true'] {
			translate: 0% 0%;
		}

		position: fixed;
		width: 300px;
		top: 0;
		bottom: 0;
		left: 0;
		background-color: white;
		padding: 1rem;
		border-top: 1px solid var(--line-color, #ccc);
		transition: translate 0.3s;
	}
</style>
