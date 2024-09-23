<script lang="ts">
	type WorkoutPlan = {
		name: string;
		description: string;
		duration: string;
		intensity: string;
	};

	export let workoutPlan: WorkoutPlan;
</script>

<div class="workout-plan-card">
	<h2>{workoutPlan.name}</h2>
	<p>{workoutPlan.description}</p>
	<p>{workoutPlan.duration}</p>
	<p>{workoutPlan.intensity}</p>
</div>

<style>
	.workout-plan-card {
		border: 1px solid #000;
		padding: 1rem;
		border-radius: 0.5rem;
	}
</style>
