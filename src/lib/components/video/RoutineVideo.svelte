<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getIntervalTimer, IntervalTimer } from '../../store/timers/interval_timer.svelte';
	import VideoBg from '../hero/video-hero/VideoBG.svelte';

	let {
		children,
		className = ''
	}: {
		children?: Snippet;
		className?: string;
	} = $props();
	const intervalTimer = getIntervalTimer();
	let videoEl: HTMLVideoElement | undefined = $state();
	// get the path to assets/video
</script>

<VideoBg
	videoSrc={intervalTimer.currentExercise?.videoSrc || ''}
	{className}
	isAutoPlay={!intervalTimer.isPaused}
>
	{@render children?.()}
</VideoBg>

<style>
</style>
