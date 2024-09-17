<script lang="ts">
  import type { PageLoad } from "./$types";
  export const prerender = true;
  export let data;
  import GradientButton from "../../lib/components/GradientButton.svelte";
  import ExerciseCard from "../../lib/components/ExerciseCard.svelte";

  export let exercises: Array<{
    id: number;
    name: string;
    description: string;
    image: string;
  }>; // Adjust the type as needed
</script>

<svelte:head>
  <title>About</title>
  <meta name="description" content="About this app" />
</svelte:head>

<h1>Your workouts</h1>
<div class="card-grid">
  {#each data.exercises as exercise}
    <ExerciseCard {exercise} />
  {/each}
</div>

<style>
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
</style>
