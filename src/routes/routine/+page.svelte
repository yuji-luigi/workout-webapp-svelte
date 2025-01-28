<script lang="ts">
	import RoutineConfirmDialogContent from '$lib/components/dialog/contents/RoutineConfirmDialog.svelte';
	import VideoHero from '$lib/components/hero/video-hero/VideoHero.svelte';
	import { onMount } from 'svelte';
	import AddNewCard from '../../lib/components/card/workout-card/AddNewCard.svelte';
	import DialogGeneric from '../../lib/components/dialog/global/DialogGeneric.svelte';
	import { openStackDialog } from '../../lib/store/dialog-stack/dialogStackStore';
	import { getRoutines, routinesStore } from '../../lib/store/states/routine_store.svelte';
	import RoutineList from './routine-list/RoutineList.svelte';
	import { openStackDialogNew } from '../../lib/store/dialog-stack/dialogStackStoreNew';
	let cardGrid: HTMLDivElement;
	let routines = $derived(routinesStore.list);

	onMount(async () => {
		await getRoutines();
	});

	// Adjust the type as needed
	//click event type
	function handleClick(e: MouseEvent) {
		console.log('handleClickd ');
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
</script>

<VideoHero
	videoStyle="--video-object-position: 50% 25%;"
	videoSrc="/videos/cover/workout_with_yume.mov"
	class="video"
/>
<div class="stretch-container flex-column">
	<div class="flex-row title-row">
		<h1>Select workouts/routines</h1>
		<button onclick={() => console.log('implement something')} class="button primary"
			>Add routine/workout TEST</button
		>
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
