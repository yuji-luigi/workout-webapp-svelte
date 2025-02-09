<script>
	import OverlayTB from '../overlay/GradientOverlayTB.svelte';
	import { getIntervalTimer } from '$lib/store/timers/interval_timer.svelte';
	import { formatTime } from '../../helpers/formatTime';
	const intervalTimer = getIntervalTimer();
	$effect(() => {
		console.log(intervalTimer.totalElapsedTimeString);
	});
</script>

<OverlayTB --padding="var(--padding-md)">
	<section class="routine-video-info-section">
		<div class="elapsed-time-container">
			<p class="total-elapsed-time">{intervalTimer.totalElapsedTimeString}</p>
			<p class="set-elapsed-time">00:00</p>
		</div>
		<div class="block-info-container">block 2</div>
		<div class="set-info-container">
			<p class="set-count">2/4 Sets</p>
		</div>
	</section>
</OverlayTB>

<style>
	.routine-video-info-section {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: var(--gap-md);
		padding-bottom: 3rem;
	}

	.elapsed-time-container {
		display: flex;
		flex-direction: column;
		gap: var(--gap-md);
	}
	.set-elapsed-time {
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
	}
	.block-info-container {
		display: flex;
		justify-content: center;
		align-items: flex-end;
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
	}
	.set-info-container {
		display: flex;
		justify-content: flex-end;
		flex-direction: column;
		gap: var(--gap-md);
	}
	.set-count {
		text-align: right;
	}
</style>
