<script lang="ts">
	import { onMount } from 'svelte';
	import ProgressSvg from '../../../lib/components/progress/progress-svg/ProgressSvg.svelte';
	import TimerWatch from '../../../lib/components/timer/TimerWatch.svelte';
	import { getTimerTime } from '../../../lib/helpers/formatTimerTime';
	import type { Timer } from '../../../types/db/timer';
	import { goto } from '$app/navigation';
	import CountInput from '../../../lib/components/counter/CountInput.svelte';
	import { openDialog } from '../../../lib/store/global-dialog-store';
	let count = 0;

	let reps = 0;
	let currentSet = 1;

	let timePassed = 0;

	let sets = '';
	export let timer: Timer;

	onMount(() => {
		const query = new URLSearchParams(location.search);
		sets = query.get('sets') || '';
	});
	const handleBack = () => {
		goto(`/timers`);
	};

	function onFinished() {
		console.log('Rest is over!!');
	}

	$: {
		if (timePassed >= timer.seconds) {
			openDialog({});
		}
	}
</script>

<section class="timer-section">
	<button class="button">Open</button>
	<TimerWatch {timer} {onFinished}>
		<div class="contents">
			<h4>sets 1/{sets}</h4>
			<h4>reps</h4>
		</div>
	</TimerWatch>
	<div class="flex-column">
		<CountInput unit="Reps" {count} max={12} />
		<button class="button" on:click={handleBack}> back </button>
	</div>
</section>

<style>
	.timer-section {
		display: grid;
		place-items: center;
		justify-content: center;
		gap: 2rem;
	}
	.contents {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 0.5rem;
		gap: 0.25rem;
	}
	.flex-column {
		gap: 1rem;
	}
</style>
