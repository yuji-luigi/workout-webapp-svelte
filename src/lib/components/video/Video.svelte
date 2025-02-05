<script lang="ts">
	import { getIntervalTimer, IntervalTimer } from '../../store/timers/interval_timer.svelte';

	let { videoSrc }: { videoSrc: string } = $props();
	let videoEl: HTMLVideoElement | undefined = $state();
	const intervalTimer = getIntervalTimer();
	// get the path to assets/video
	const videoPath = $derived(
		import.meta.env.VITE_ASSETS_PATH + intervalTimer.currentExercise?.videoSrc
	);
	$effect(() => {
		handleVideoChange(videoPath);
	});
	function handleVideoChange(src: string) {
		if (videoEl) {
			videoEl.src = src;
		}
	}
</script>

<h1>{videoPath}</h1>
<video bind:this={videoEl} class="video" autoplay loop playsinline aria-hidden="true">
	<source id={videoPath} src={videoPath} type="video/mp4" />
	<track kind="captions" label="English captions" src="" default />
</video>

<style>
	.video {
		width: 90px;
		height: 90px;
	}
</style>
