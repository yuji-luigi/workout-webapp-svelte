<script lang="ts">
	import VideoHero from '$lib/components/hero/video-hero/VideoHero.svelte';
	import AddNewCard from '../../lib/components/card/workout-card/AddNewCard.svelte';
	import WorkoutCard from '../../lib/components/card/workout-card/WorkoutCard.svelte';
	import TimerInputDialog from '../../lib/components/form/form-by-collection/workout-form/sets-configuration-inputs/TimerInputDialog.svelte';
	import { openStackDialog } from '../../lib/store/dialog-stack/dialogStackStore';
	import { lofi_db } from '../../lib/store/lofi-db/lofi_db.svelte';
	import type { Workout } from '../../types/db/workout';

	let db_state = $state<any>(lofi_db?.db_state);
	let workouts: Workout[] = $state([]);

	$effect(() => {
		if (db_state.workouts) {
			workouts = db_state.workouts;
		}
	});
</script>

<svelte:head>
	<title>Workouts</title>
	<meta name="description" content="Exercise list page" />
</svelte:head>
<!-- <VideoHero
	videoStyle="--video-object-position: 50% 25%;"
	videoSrc="/videos/cover/workout_with_yume.mov"
	class="video"
/> -->
<input />

<div class="stretch-container flex-column">
	<h1>Workout timers</h1>
	<div class="card-grid">
		{#each workouts as workout}
			<WorkoutCard {workout} />
		{/each}
		<AddNewCard collection="workout" />
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
