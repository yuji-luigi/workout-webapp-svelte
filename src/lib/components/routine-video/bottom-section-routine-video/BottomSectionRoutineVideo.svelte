<script>
	import GradientOverlayBt from '../../overlay/GradientOverlayBT.svelte';
	import PrevButton from '../interval-timer/PrevButton.svelte';
	import PlayPauseButton from '../interval-timer/PlayPauseButton.svelte';
	import NextButton from '../interval-timer/NextButton.svelte';
	import AddSvg from '../../icons/svgs/AddSvg.svelte';
	import RepsCount from './RepsCount.svelte';
</script>

<GradientOverlayBt --padding="var(--padding-md)" className="mt-auto mx-auto">
	<section class="routine-video-bottom-section">
		<RepsCount />
		<div class="control-buttons">
			<PrevButton />
			<PlayPauseButton />
			<NextButton />
		</div>
	</section>
</GradientOverlayBt>

<style>
	.routine-video-bottom-section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: var(--gap-md);
		padding-top: 3rem;
	}
	.control-buttons {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: var(--gap-md);
		margin-top: auto;
		margin-inline: auto;
	}
	.reps-count {
		text-align: center;
	}
</style>
