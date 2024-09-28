<script lang="ts">
	import { onMount } from 'svelte';

	export let seconds: number = 0;
	export let timePassed: number = 0;

	const SIZE = 240;
	const R = SIZE / 2;

	timePassed = timePassed ? timePassed - 1 : 0;

	let percent = timePassed && seconds ? timePassed / seconds : 0;

	let circleElement: SVGCircleElement;
	onMount(() => {
		document.documentElement.style.setProperty('--size', `${SIZE}px`);
		document.documentElement.style.setProperty('--r', `${R}px`);
		getComputedStyle(document.documentElement).getPropertyValue('--r');
	});

	let circumference = Math.round(2 * Math.PI * R);
	let processed = Math.floor(circumference - circumference * percent);
	$: percent = timePassed && seconds ? timePassed / seconds : 0;
	$: r = 80;
	$: circumference = Math.round(2 * Math.PI * R);
	$: processed = Math.round(circumference - circumference * percent);
</script>

<circle
	id="empty-progress-circle"
	cx={SIZE / 2}
	cy={SIZE / 2}
	r={R}
	stroke="lightgray"
	stroke-width="10"
	fill="none"
/>
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
		r: var(--r);
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
		r: var(--r);
		fill: none;

		stroke: var(--gray-400);
		stroke-width: 10px;
		stroke-dasharray: var(--max-c);
		stroke-dashoffset: 0;
	}
</style>
