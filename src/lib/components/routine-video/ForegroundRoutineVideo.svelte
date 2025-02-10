<script lang="ts">
	import { getIntervalTimer } from '$lib/store/timers/interval_timer.svelte';
	import BottomSectionRoutineVideo from './bottom-section-routine-video/BottomSectionRoutineVideo.svelte';
	import InfoSectionTopRoutineVideo from './InfoSectionTopRoutineVideo.svelte';
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
