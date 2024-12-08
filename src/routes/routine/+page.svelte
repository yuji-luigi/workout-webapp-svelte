<script lang="ts">
	import VideoHero from '$lib/components/hero/video-hero/VideoHero.svelte';
	import RoutineCard from '$lib/components/card/cards/RoutineCard.svelte';
	import RoutineConfirmDialogContent from '$lib/components/dialog/contents/RoutineConfirmDialogContent.svelte';
	import { openDialog } from '$lib/store/global-dialog-store';

	let cardGrid: HTMLDivElement;
	export let data;
	const { routines } = data;
	// Adjust the type as needed
	//click event type
	function handleClick(e: MouseEvent) {
		const cardEl = (e.target as HTMLElement)?.closest('.card') as HTMLDivElement;
		if (cardEl) {
			// target gets to active state.
			cardEl.dataset.active = 'true';
			const routine = routines[Number(cardEl.dataset.index)];
			// open global dialog with the target routine data
			openDialog({
				componentInDialog: {
					component: RoutineConfirmDialogContent,
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
	<h1>timers</h1>
	<div
		role="button"
		tabindex="0"
		bind:this={cardGrid}
		on:click={handleClick}
		on:keydown={null}
		class="card-grid"
	>
		{#each routines as routine, index}
			<RoutineCard {routine} active={false} {index} />
		{/each}
		<!-- {#each timers as timer, index}
			<TimerCard {timer} active={timer.active} {index} />
		{/each} -->
	</div>
</div>

<style>
	.card-grid {
		position: relative;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		grid-auto-rows: 400px;
		place-content: center;
		/* gap: 0.25rem; */
	}

	h1 {
		margin-bottom: 1rem;
	}
</style>
