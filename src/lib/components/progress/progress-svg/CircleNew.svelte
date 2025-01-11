<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { snapshot } from 'yjs';
	let { seconds, timePassed }: { seconds: number; timePassed: number } = $props();
	let mediaQuery: MediaQueryList;
	let circleElement: SVGCircleElement;
	const _SIZE = 400;
	let isSmallScreen = $state(false); // Track if the screen is small
	let size = $derived(isSmallScreen ? _SIZE * 0.7 : _SIZE);
	let r = $derived(size / 2);

	timePassed = timePassed ? timePassed : 0;

	let percent = $derived(timePassed && seconds ? timePassed / seconds : 0);
	let circumference = $derived(Math.round(2 * Math.PI * r));
	let processed = $derived(Math.floor(circumference - circumference * percent));

	function handleMediaChange(e: MediaQueryListEvent) {
		isSmallScreen = e.matches;
	}

	onMount(() => {
		document.documentElement.style.setProperty('--size-base', `${size}px`);
		document.documentElement.style.setProperty('--r', `${r}px`);
		// Media query to detect screen size changes
		mediaQuery = window.matchMedia('(max-width: 768px)');

		// Listener to detect changes

		// Set initial state based on the current screen size
		isSmallScreen = mediaQuery.matches;

		// Add listener to handle changes
		mediaQuery.addEventListener('change', handleMediaChange);

		// Cleanup the event listener when component is destroyed
	});
	onDestroy(() => {
		mediaQuery?.removeEventListener('change', handleMediaChange);
	});
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
