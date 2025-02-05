<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getIntervalTimer, IntervalTimer } from '../../store/timers/interval_timer.svelte';
	import VideoBg from '../hero/video-hero/VideoBG.svelte';

	let {
		videoSrc,
		children
	}: {
		videoSrc: string;
		children?: Snippet;
	} = $props();
	let videoEl: HTMLVideoElement | undefined = $state();
	const intervalTimer = getIntervalTimer();
	// get the path to assets/video
	const videoPath = $derived(import.meta.env.VITE_ASSETS_PATH + videoSrc);
	$effect(() => {
		handleVideoChange(videoPath);
	});
	function handleVideoChange(src: string) {
		if (videoEl) {
			videoEl.src = src;
		}
	}
</script>

<VideoBg videoSrc={videoPath}>
	{@render children?.()}
</VideoBg>

<style>
</style>
