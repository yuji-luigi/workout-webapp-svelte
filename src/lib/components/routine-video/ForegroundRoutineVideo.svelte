<script lang="ts">
	import { getIntervalTimer } from '$lib/store/timers/interval_timer.svelte';
	import PrevButton from '$lib/components/routine-video/interval-timer/PrevButton.svelte';
	import NextButton from '$lib/components/routine-video/interval-timer/NextButton.svelte';
	import PlayPauseButton from './interval-timer/PlayPauseButton.svelte';
	import OverlayTB from '../overlay/GradientOverlayTB.svelte';
	import OverlayCard from '../card/cards/OverlayCard.svelte';
	import GradientOverlayBt from '../overlay/GradientOverlayBT.svelte';
	import InfoSectionTopRoutineVideo from './InfoSectionTopRoutineVideo.svelte';
	import BottomSectionRoutineVideo from './BottomSectionRoutineVideo.svelte';
	const intervalTimer = getIntervalTimer();
</script>

<div class="video-foreground">
	<InfoSectionTopRoutineVideo />
	<BottomSectionRoutineVideo />
</div>

<style>
	.video-foreground {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		z-index: 1;
	}
</style>
