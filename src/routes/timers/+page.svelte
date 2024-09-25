<script lang="ts">
	import type { PageLoad } from './$types';
	export const prerender = true;
	export let data;
	import GradientButton from '../../lib/components/GradientButton.svelte';
	import VideoHero from '$lib/components/hero/video-hero/VideoHero.svelte';
	import ExerciseCard from '../../lib/components/card/exercise-card/ExerciseCard.svelte';
	import TimerCard from '../../lib/components/card/timer-card/TimerCard.svelte';
	import { openDialog } from '../../store/dialog-store';
	import TimerConfirmDialogContent from '../../lib/components/card/timer-card/TimerConfirmDialogContent.svelte';

	let cardGrid: HTMLDivElement;

	let timers = data.timers;
	// Adjust the type as needed
	//click event type
	function handleClick(e: MouseEvent) {
		const cardEl = (e.target as HTMLElement)?.closest('.card') as HTMLDivElement;
		if (cardEl) {
			// target gets to active state.
			cardEl.dataset.active = 'true';
			const timer = timers[Number(cardEl.dataset.index)];
			// open global dialog with the target timer data
			openDialog({
				componentInDialog: {
					component: TimerConfirmDialogContent,
					props: { timer }
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
		{#each data.timers as timer, index}
			<TimerCard {timer} active={timer.active} {index} />
		{/each}
	</div>
</div>

<style>
	.card-grid {
		position: relative;
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
