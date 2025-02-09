<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getIntervalTimer, IntervalTimer } from '../../store/timers/interval_timer.svelte';
	import VideoBg from '../hero/video-hero/VideoBG.svelte';

	let {
		videoSrc,
		children,
		className = ''
	}: {
		videoSrc: string;
		children?: Snippet;
		className?: string;
	} = $props();
	let videoEl: HTMLVideoElement | undefined = $state();
	// get the path to assets/video
</script>

<VideoBg {videoSrc} {className}>
	{@render children?.()}
</VideoBg>

<style>
</style>
