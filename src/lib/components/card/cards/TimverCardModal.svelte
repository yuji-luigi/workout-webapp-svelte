<script lang="ts">
	export let exercise;
</script>

<div class="flex-column">
	<img src={exercise.image} alt="exercise" />
	<h2 class="title">{exercise.name}</h2>
	<p style="">{exercise.description}</p>
</div>

<style>
	.flex-column {
		gap: 1rem;
	}
</style>
