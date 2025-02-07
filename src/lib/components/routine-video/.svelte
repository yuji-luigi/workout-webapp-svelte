<script>
	import OverlayTB from '../overlay/GradientOverlayTB.svelte';
</script>

<OverlayTB --padding="var(--padding-md)">
	<section class="routine-video-info-section">
		<div class="elapsed-time-container">
			<p class="total-elapsed-time">00:00</p>
			<p class="set-elapsed-time">00:00</p>
		</div>
		<div class="set-info-container">
			<p class="set-count">2/4</p>
		</div>
	</section>
</OverlayTB>

<style>
	.routine-video-info-section {
		display: grid;
		grid-template-columns: 1fr 1fr;
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
