<script lang="ts">
	import { onMount } from 'svelte';

	export let seconds: number = 0;
	export let timePassed: number = 0;
	console.log(timePassed);
	let percent = timePassed && seconds ? timePassed / seconds : 0;

	let r = 80;

	let circumference = Math.round(2 * Math.PI * r);
	let processed = Math.round(circumference - circumference * percent);
	$: percent = timePassed && seconds ? timePassed / seconds : 0;
	$: r = 80;
	$: circumference = Math.round(2 * Math.PI * r);
	$: processed = Math.round(circumference - circumference * percent);

	// Reactive console logging to see updated values
	$: console.log({ processed, percent, timePassed });
	$: console.log({ processed, percent });
</script>

<circle stroke-linecap="round" style={`--processed:${processed};--max-c:${circumference};`} />

<style>
	:root {
		--size: 160px;
		--r: calc(var(--size) / 2);
		--max-c: calc(var(--r) * 2 * 3.14159265359);
		--processed: 200;
	}
	circle {
		cx: calc(var(--size) / 2);
		cy: calc(var(--size) / 2);
		/* cy: 100px; */
		/* r: calc((var(--size) / 2) + 10px); */
		r: var(--r);
		fill: none;
		stroke: url(#GradientColor);
		stroke-width: 10px;
		stroke-dasharray: var(--max-c);
		stroke-dashoffset: var(--processed, 200);
		/* 450 - 450 * percent */

		transition: stroke-dashoffset 2s;
	}
</style>
