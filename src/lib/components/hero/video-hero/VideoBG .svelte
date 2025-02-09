<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { videoBgElState } from './VideoBGState.svelte';
	import { getIntervalTimer } from '../../../store/timers/interval_timer.svelte';
	let {
		videoSrc,
		videoStyle,
		className,
		children
	}: {
		videoSrc: string;
		videoStyle?: string;
		className?: string;
		children?: Snippet;
	} = $props();
	let videoEl: undefined | HTMLVideoElement = $state();
	const intervalTimer = getIntervalTimer();
	// NOTE: I can only do this to change the video. search other solution than effect

	$effect(() => {
		console.log('isPaused', $state.snapshot(intervalTimer.isPaused));
		if (videoEl) {
			videoEl.src = videoSrc;
		}
	});

	onMount(() => {
		if (videoBgElState && videoEl) {
			videoBgElState.element = videoEl;
		}
	});
</script>

<div class={`video-container full-width ${className}`}>
	<video
		bind:this={videoEl}
		style={videoStyle}
		class={`video ${className}`}
		loop
		muted
		playsinline
		autoplay={intervalTimer.isPaused}
	>
		<source src={videoSrc} type="video/mp4" />
	</video>
	<div class="video-foreground-container">
		{@render children?.()}
	</div>
</div>

<style>
	video {
		--video-object-position: center;
		height: 100%;
		width: 100%;
		transform: scale(1.2);
		object-fit: cover;
		object-position: var(--video-object-position);
		z-index: 0;
		transform: translate(-50%, -50%);
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-playsinline: true;
		playsinline: true;
	}
	.video-container {
		min-height: 100dvh;
		position: relative;
		top: 0;
		left: 0;
		right: 0;
		transition: min-height 0.75s ease;
		transform: translateZ(-1px);

		@media (max-width: 768px) {
			min-height: 100dvh;
		}
		/* overflow: hidden; */
		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			/* background-color: rgba(0, 0, 0, 0.8); */
			z-index: 1;
		}
	}
	.video-foreground-container {
		display: flex;
		color: var(--text-color-white);
		flex-direction: column;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		position: absolute;
		padding-top: var(--sub-header-height);

		z-index: 1;
	}
</style>
