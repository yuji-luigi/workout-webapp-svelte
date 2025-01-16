<script lang="ts">
	import { onDestroy, onMount, type Snippet } from 'svelte';
	import ProgressSvg from '../progress/progress-svg/ProgressSvg.svelte';
	import { getTimerTime } from '../../helpers/formatTimerTime';
	import Circle from '../progress/progress-svg/Circle.svelte';
	import type { RoutineJoined } from '../../../types/db/routine';
	import audio from '$lib/assets/sounds/count-down-sha.mp3';
	type Status = 'COUNTDOWN' | 'COUNTUP' | 'PAUSE' | 'FINISHED' | 'PRE_START';

	let {
		time,
		timerController,
		children,
		onFinished
	}: {
		onFinished?: () => void;
		children?: Snippet;
		time: number;
		timerController: {
			handleNext: () => void;
			handlePrev: () => void;
		};
	} = $props();
	let interval: number;
	let isRunning = false;
	let computedTime = $state('0');
	let displaySeconds = 0;
	let seconds = $derived(time);
	let timePassed = $state(0);
	// let timerStatus = $state<Status>('PRE_START');
	/* 
1. start from rep phase(count up)
2. count up phase: on click/tap switch to rest phase that starts count down.(compute remaining time)
3. when time is up, vibrate, switching to rep/(count up) phase.
4. how to count reps per set?: you can count with counter any time for current set or set before rest phase
*/

	/* 
  1. routine types: custom, tabata, emom, amrap, for time, for reps
*/
	function handleToggleWatch() {
		// if (timerStatus === 'PRE_START') {
		// 	timerStatus = 'COUNTDOWN';
		// 	countDown();
		// 	return;
		// }
		if (isRunning) {
			stop();
		} else {
			countDown();
		}
	}

	function countDown() {
		if (isRunning) return;
		isRunning = true;
		interval = setInterval(() => {
			if (seconds - timePassed === 3) {
				new Audio(audio).play();
			}
			if (seconds - timePassed <= 3) {
				navigator.vibrate(300);
			}
			if (timePassed >= seconds) {
				clearInterval(interval);
				navigator.vibrate(1000);
				isRunning = false;
				computedTime = getTimerTime(seconds - timePassed - 1);
				onFinished?.();
				timerController.handleNext();
				timePassed = 0;
				countDown();
				return;
			}
			timePassed++;
			computedTime = getTimerTime(seconds - timePassed + 1);
		}, 1000);
	}
	function countUp() {
		displaySeconds = 0;
		if (isRunning) return;
		isRunning = true;
		interval = setInterval(() => {
			displaySeconds++;
			computedTime = getTimerTime(displaySeconds);
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
		// countUp();
		// countDown();
	});
</script>

<div class="watch" onclick={handleToggleWatch} role="button" tabindex="0" onkeydown={null}>
	<div class="skill">
		<div class="outer">
			<div class="inner">
				<h3 class="title" id="watch-inside">
					{computedTime}
				</h3>
				{children?.()}
			</div>
		</div>
	</div>
	<ProgressSvg seconds={time} {timePassed} />
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
