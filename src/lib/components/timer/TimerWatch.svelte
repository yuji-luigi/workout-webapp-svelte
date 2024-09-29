<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { Timer } from '../../../types/db/timer';
	import ProgressSvg from '../progress/progress-svg/ProgressSvg.svelte';
	import { getTimerTime } from '../../helpers/formatTimerTime';
	import Circle from '../progress/progress-svg/Circle.svelte';
	import { countDown } from './timer-sound';

	export let timer: Timer;
	export let seconds = timer.seconds;
	export let timePassed = 0;
	let interval: number;
	let isRunning = false;
	let computedTime = getTimerTime(seconds);

	function handleToggleWatch() {
		if (isRunning) {
			stop();
		} else {
			start();
		}
	}

	function start() {
		if (isRunning) return;
		isRunning = true;
		interval = setInterval(() => {
			if (seconds - timePassed <= 3) {
				countDown();
				navigator.vibrate(300);
			}
			if (timePassed >= seconds) {
				clearInterval(interval);
				navigator.vibrate(1000);
				isRunning = false;
				computedTime = getTimerTime(seconds - timePassed - 1);
				return;
			}
			timePassed++;
			computedTime = getTimerTime(seconds - timePassed + 1);
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
		// start();
	});
</script>

<div class="watch" on:click={handleToggleWatch} role="button" tabindex="0" on:keydown={null}>
	<div class="skill">
		<div class="outer">
			<div class="inner">
				<h3 class="title" id="watch-inside">
					{computedTime}
				</h3>
				<slot />
			</div>
		</div>
	</div>
	<ProgressSvg {seconds} {timePassed} />
</div>
<div class="flex-row">
	<button>back</button>
	<button>next</button>
</div>

<style>
	.title {
		font-size: 2rem;
	}
	.watch {
		--size: calc(var(--size-base) + 10px);
		position: relative;
		/* border: solid 4px #000; */
		/* width: var(--size);
		height: var(--size); */
		border-radius: var(--watch-radius);
	}
	@media (max-width: 768px) {
		.watch {
			--size: calc(var(--size-base) * 0.7 + 20px);
		}
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
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* border-radius: 50%; */
		/* box-shadow:
			inset 4px 4px 6px -1px rgba(0, 0, 0, 0.2),
			inset -4px -4px 6px -1px rgba(255, 255, 255, 0.7),
			inset -0.5px -0.5px 6px -1px rgba(255, 255, 255, 0.7); */
	}
</style>
