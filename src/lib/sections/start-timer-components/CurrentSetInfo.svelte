<script lang="ts">
	import { getIntervalTimer } from '../../store/timers/interval_timer.svelte';

	const intervalTimer = getIntervalTimer();
	intervalTimer.currentFlow;
</script>

<section class="blackboard-section">
	<div class="container blackboard-content">
		<!-- <h3 class="full-width center">CURRENT EXERCISE</h3>
		<h3>Set #{intervalTimer.currentFlow.set_index}</h3>
		<p>{intervalTimer.currentExercise.name}</p> -->
	</div>
</section>

<style>
	.blackboard-section {
		min-height: 50vh;
		font-family: 'DkCrayonCrumble';
		font-size: 1.5rem;
		padding: 2rem 3rem;
		border-bottom: var(--color-primary) 5px solid;
	}
	.blackboard-content {
		display: grid;
		gap: var(--gap-md);
		grid-template-columns: 1fr 1fr;
	}
</style>
