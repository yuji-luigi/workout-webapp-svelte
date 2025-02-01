<script lang="ts">
	import RoutineConfirmDialogContent from '$lib/components/dialog/contents/RoutineConfirmDialog.svelte';
	import VideoHero from '$lib/components/hero/video-hero/VideoHero.svelte';
	import { onMount } from 'svelte';
	import AddNewCard from '../../lib/components/card/workout-card/AddNewCard.svelte';
	import RoutineForm from '../../lib/components/form/form-by-collection/routine-form/RoutineForm.svelte';
	import { openStackDialogNew } from '../../lib/store/dialog-stack/dialogStackStoreNew';
	import { getRoutines, routinesStore } from '../../lib/store/states/routine_store.svelte';
	import videoYume from '$assets/videos/cover/workout_with_yume.mp4';
	import RoutineList from './routine-list/RoutineList.svelte';
	let routines = $derived(routinesStore.list);

	onMount(async () => {
		await getRoutines();
	});

	// Adjust the type as needed
	//click event type
	function handleClick(e: MouseEvent) {
		console.log('handleClicked ');
		const cardEl = (e.target as HTMLElement)?.closest('.selection-card') as HTMLDivElement;
		if (cardEl) {
			// target gets to active state.
			cardEl.dataset.active = 'true';
			const routine = routines.find((r) => r.id.toString() === cardEl.dataset.id);
			// open global dialog with the target routine data
			openStackDialogNew({
				component: RoutineConfirmDialogContent,
				props: { routine },
				dialogClasses: ['max-width-800']
			});
			// openStackDialog({
			// 	component: RoutineConfirmDialogContent,
			// 	props: { routine },
			// 	dialogClasses: ['max-width-800']
			// });
			// openDialog({
			// 	componentInDialog: {
			// 		component: RoutineConfirmDialogContent as any,
			// 		props: { routine }
			// 	}
			// });
		}
	}
	function handleAddNewClicked() {
		console.log('handle add new');
		openStackDialogNew({
			component: RoutineForm as any,
			props: {}
		});
	}
</script>

<VideoHero videoStyle="--video-object-position: 50% 25%;" videoSrc={videoYume} class="video" />
<div class="stretch-container flex-column">
	<div class="flex-row title-row">
		<h1>Select workouts/routines</h1>
		<button onclick={handleAddNewClicked} class="button primary">Add</button>
	</div>
	<div role="button" tabindex="0" onclick={handleClick} onkeydown={null} class="card-grid">
		<RoutineList {routines} sectionClicked={() => console.log('clicked')} />
		<AddNewCard onclick={handleAddNewClicked} collection="routine" />
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
		@media (max-width: 768px) {
			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
			grid-auto-rows: 200px;
		}
	}
</style>
