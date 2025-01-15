<script lang="ts">
	import RoutineConfirmDialogContent from '$lib/components/dialog/contents/RoutineConfirmDialogContent.svelte';
	import VideoHero from '$lib/components/hero/video-hero/VideoHero.svelte';
	import { openDialog } from '$lib/store/global-dialog-store';
	import { onDestroy, onMount } from 'svelte';
	import AddNewCard from '../../lib/components/card/workout-card/AddNewCard.svelte';
	import { db } from '../../lib/db/dexie-db/dexie-db';
	import type { RoutineJoined } from '../../types/db/routine';
	import RoutineList from './routine-list/RoutineList.svelte';
	import { getRoutines, routinesStore } from '../../lib/store/states/routine_store.svelte';
	let cardGrid: HTMLDivElement;
	let routines = $derived(routinesStore.list);

	onMount(async () => {
		await getRoutines();
	});

	// Adjust the type as needed
	//click event type
	function handleClick(e: MouseEvent) {
		const cardEl = (e.target as HTMLElement)?.closest('.selection-card') as HTMLDivElement;
		if (cardEl) {
			// target gets to active state.
			cardEl.dataset.active = 'true';
			const routine = routines.find((r) => r.id.toString() === cardEl.dataset.id);
			// open global dialog with the target routine data
			openDialog({
				componentInDialog: {
					component: RoutineConfirmDialogContent as any,
					props: { routine }
				}
			});
		}
	}
</script>

<svelte:head>
	<title>timers</title>
	<meta name="description" content="Exercise list page" />
</svelte:head>
<VideoHero
	videoStyle="--video-object-position: 50% 25%;"
	videoSrc="/videos/cover/workout_with_yume.mov"
	class="video"
/>

<div class="stretch-container flex-column">
	<div class="flex-row title-row">
		<h1>Select workouts/routines</h1>
		<button class="button primary">Add routine/workout</button>
	</div>
	<div
		role="button"
		tabindex="0"
		bind:this={cardGrid}
		onclick={handleClick}
		onkeydown={null}
		class="card-grid"
	>
		<RoutineList {routines} sectionClicked={() => console.log('clicked')} />
		<AddNewCard collection="routine" />
	</div>
</div>

<style>
	.title-row {
		margin-bottom: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.card-grid {
		position: relative;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		grid-auto-rows: 400px;
		place-content: center;
		/* gap: 0.25rem; */
	}
</style>
