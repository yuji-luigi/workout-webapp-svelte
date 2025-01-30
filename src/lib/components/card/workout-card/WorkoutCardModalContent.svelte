<script lang="ts">
	import type { Workout } from '../../../../types/db/workout';
	import Chip from '../../chip/Chip.svelte';

	let { workout }: { workout: Workout } = $props();
</script>

<div class="flex-column">
	<div class="flex-row">
		<h2 class="title">{workout.name}</h2>
		<Chip>{workout.type.name}</Chip>
	</div>
	<p>{workout.description}</p>
	<h2>Set up exercises</h2>
	<section class="set-up-container">
		{#each workout.exercises as exercise}
			<div class="exercise-row">
				<h4 class="exercise-name">
					{exercise.name}
				</h4>
				<div class="value">5</div>
				<div class="unit">sets</div>
			</div>
		{/each}
	</section>
	<p style="">{workout.description}</p>
	<img
		height="300"
		width="410"
		src={'https://thumbs.dreamstime.com/b/sporty-sexy-couple-showing-muscle-workout-gym-muscular-man-wowan-men-148692820.jpg'}
		alt="workout"
	/>
</div>

<style>
	img {
		margin-inline: auto;
	}
	.flex-column {
		gap: 1rem;
		justify-content: start;
		align-items: start;
	}
	.flex-row {
		width: 100%;
		justify-content: space-between;
	}
	.set-up-container {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}
	.exercise-row {
		display: grid;
		grid-template-columns: subgrid;
		grid-column: -1 / 1;
		background-color: red;
	}
</style>
