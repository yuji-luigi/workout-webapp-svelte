<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { Timer } from '../../../types/db/timer';
	import ProgressSvg from '../progress/progress-svg/ProgressSvg.svelte';
	import { getTimerTime } from '../../helpers/formatTimerTime';
	import Circle from '../progress/progress-svg/Circle.svelte';

	export let timer: Timer;
	let seconds = timer.seconds;
	let timePassed = 0;
	let interval: number;
	let isRunning = false;
	let computedTime = getTimerTime(seconds - 1);

	function start() {
		if (isRunning) return;
		isRunning = true;
		interval = setInterval(() => {
			if (timePassed >= seconds) {
				clearInterval(interval);
				isRunning = false;
				computedTime = getTimerTime(seconds - timePassed - 1);
				return;
			}
			timePassed++;
			computedTime = getTimerTime(seconds - timePassed);
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

<div class="watch">
	<div class="skill">
		<div class="outer">
			<div class="inner">
				<h3 id="watch-inside">{computedTime}</h3>
			</div>
		</div>
	</div>
	<ProgressSvg {seconds} {timePassed} />
</div>

<style>
	.watch {
		--size: 250px;
		position: relative;
		/* border: solid 4px #000; */
		width: var(--size);
		height: var(--size);
		border-radius: var(--watch-radius);
	}
	.outer {
		height: var(--size);
		width: var(--size);
		border-radius: 50%;
		padding: var(--padding-outer);
		box-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.15);
	}
	.inner {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		/* border-radius: 50%; */
		/* box-shadow:
			inset 4px 4px 6px -1px rgba(0, 0, 0, 0.2),
			inset -4px -4px 6px -1px rgba(255, 255, 255, 0.7),
			inset -0.5px -0.5px 6px -1px rgba(255, 255, 255, 0.7); */
	}
</style>
