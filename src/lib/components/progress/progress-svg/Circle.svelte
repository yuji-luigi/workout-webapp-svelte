<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	export let seconds: number = 0;
	export let timePassed: number = 0;
	const _SIZE = 400;
	let SIZE = _SIZE;
	let R = SIZE / 2;
	let isSmallScreen = false; // Track if the screen is small

	timePassed = timePassed ? timePassed - 1 : 0;

	let percent = timePassed && seconds ? timePassed / seconds : 0;
	function updateSize() {
		SIZE = isSmallScreen ? _SIZE * 0.7 : _SIZE;
		R = SIZE / 2;
	}
	function handleMediaChange(e: MediaQueryListEvent) {
		isSmallScreen = e.matches;
		updateSize();
	}

	let mediaQuery: MediaQueryList;
	let circleElement: SVGCircleElement;
	onMount(() => {
		document.documentElement.style.setProperty('--size-base', `${SIZE}px`);
		document.documentElement.style.setProperty('--r', `${R}px`);
		// Media query to detect screen size changes
		mediaQuery = window.matchMedia('(max-width: 768px)');

		// Listener to detect changes

		// Set initial state based on the current screen size
		isSmallScreen = mediaQuery.matches;
		updateSize();

		// Add listener to handle changes
		mediaQuery.addEventListener('change', handleMediaChange);

		// Cleanup the event listener when component is destroyed
	});
	onDestroy(() => {
		mediaQuery?.removeEventListener('change', handleMediaChange);
	});

	let circumference = Math.round(2 * Math.PI * R);
	let processed = Math.floor(circumference - circumference * percent);

	$: {
		percent = timePassed && seconds ? timePassed / seconds : 0;
		circumference = Math.round(2 * Math.PI * R);
		processed = Math.round(circumference - circumference * percent);
	}
</script>

<circle id="empty-progress-circle" stroke="lightgray" stroke-width="10" fill="none" />
<circle
	bind:this={circleElement}
	stroke-linecap="round"
	style={`--processed:${processed};--max-c:${circumference};`}
/>

<style>
	circle {
		position: relative;
		cx: calc(var(--size) / 2);
		cy: calc(var(--size) / 2);
		/* cy: 100px; */
		/* r: calc((var(--size) / 2) + 10px); */
		r: calc(var(--size) / 2 - 10px);
		fill: none;
		stroke: url(#GradientColor);
		stroke-width: 10px;
		stroke-dasharray: var(--max-c);
		stroke-dashoffset: var(--processed);
		/* stroke-dashoffset: var(--processed); */
		/* 450 - 450 * percent */
		transition: stroke-dashoffset 1s linear;
	}

	#empty-progress-circle {
		position: relative;
		cx: calc(var(--size) / 2);
		cy: calc(var(--size) / 2);
		fill: none;
		/* r: 100px; */
		r: calc(var(--size) / 2 - 10px);

		stroke: var(--gray-400);
		stroke-width: 10px;
		stroke-dasharray: var(--max-c);
		stroke-dashoffset: 0;
	}
</style>
