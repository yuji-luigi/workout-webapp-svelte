<script lang="ts">
	import VideoHero from '$lib/components/hero/video-hero/VideoHero.svelte';
	import AddNewCard from '../../lib/components/card/workout-card/AddNewCard.svelte';
	import WorkoutCard from '../../lib/components/card/workout-card/WorkoutCard.svelte';
	import WorkoutForm from '../../lib/components/form/form-by-collection/workout-form/WorkoutForm.svelte';
	import { openStackDialogNew } from '../../lib/store/dialog-stack/dialogStackStoreNew';
	import type { Workout } from '../../types/db/workout';

	let workouts: Workout[] = $state([]);
	function handleAddNewClicked() {
		// goto('/routine/create');
		openStackDialogNew({
			component: WorkoutForm as any,
			props: {}
		});
	}
	$effect(() => {
		workouts = [];
	});
</script>

<svelte:head>
	<title>Workouts</title>
	<meta name="description" content="Exercise list page" />
</svelte:head>
<VideoHero
	videoStyle="--video-object-position: 50% 25%;"
	videoSrc="/videos/cover/workout_with_yume.mov"
	class="video"
/>

<div class="stretch-container flex-column">
	<h1>Workout timers</h1>
	<div class="card-grid">
		{#each workouts as workout}
			<WorkoutCard {workout} />
		{/each}
		<AddNewCard onclick={handleAddNewClicked} />
	</div>
</div>

<style>
	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		grid-auto-rows: 400px;
		place-content: center;
		/* gap: 1rem; */
	}

	h1 {
		margin-bottom: 1rem;
	}
</style>
