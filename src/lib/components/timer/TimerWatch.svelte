<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { Timer } from '../../../types/db/timer';
	import ProgressSvg from '../progress/progress-svg/ProgressSvg.svelte';

	export let timer: Timer;
	let seconds = timer.seconds;
	let timePassed = 0;
	let interval: number;
	let isRunning = false;

	function start() {
		if (isRunning) return;
		isRunning = true;
		interval = setInterval(() => {
			timePassed++;
			if (timePassed > seconds) {
				clearInterval(interval);
				isRunning = false;
			}
		}, 1000);
	}

	function stop() {
		clearInterval(interval);
		isRunning = false;
	}

	onDestroy(() => {
		clearInterval(interval);
	});

	onMount(() => {
		start();
	});
</script>

<progress max="100" value="20"></progress>
<h1>{seconds - timePassed}</h1>
<div class="watch">
	<div class="remaining">JIJ</div>
	<ProgressSvg {seconds} {timePassed} />
</div>

<style>
	:root {
		--watch-radius: 50%;
		--border-color: orange;
		--empty-border-color: lightgray;
	}
	progress {
		width: 200px;
	}

	.remaining {
		position: absolute;
		top: 0;
		left: 50%;
		right: 50%;
		width: 5px;
		height: 5px;

		border-radius: var(--watch-radius);
		display: grid;
		place-content: center;
		gap: 1rem;
		background: red;
		/* border: solid 3px var(--border-color); */
		/* background: conic-gradient(var(--border-color) 20%, var(--empty-border-color) 80%); */
	}
	.watch {
		--size: 250px;
		position: relative;
		border: solid 4px #000;
		width: var(--size);
		height: var(--size);
		border-radius: var(--watch-radius);
	}
	.progress-bar {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		background: radial-gradient(closest-side, white 95%, transparent 0% 0%),
			conic-gradient(var(--border-color) 75%, var(--empty-border-color) 0%);
	}
</style>
