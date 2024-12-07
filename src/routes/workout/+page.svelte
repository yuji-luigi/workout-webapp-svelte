<script lang="ts">
	import VideoHero from '$lib/components/hero/video-hero/VideoHero.svelte';
	import { onMount } from 'svelte';
	import WorkoutCard from '../../lib/components/card/workout-card/WorkoutCard.svelte';
	import { createWebsocketStates } from '../../lib/store/socket-store.svelte';
	import type { Workout } from '../../types/db/workout';
	import AddNewCard from '../../lib/components/card/workout-card/AddNewCard.svelte';
	import { clientImport } from '../../lib/helpers/dynamic-import';
	let wsStates = createWebsocketStates();
	let db_state = $state<any>();
	let workouts: Workout[] = $state([]);
	onMount(async () => {
		if (wsStates.isConnected) {
			const { db_state: db_state_dynamic, persistenceWorkoutDB } = await import(
				'../../lib/store/lofi-db/workout-lofi.svelte'
			);
			await persistenceWorkoutDB.whenSynced;
			db_state = db_state_dynamic;
			workouts = db_state.workouts;
		}
	});
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
