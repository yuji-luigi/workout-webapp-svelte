<script lang="ts">
	import { getIntervalTimer } from '../../../store/timers/interval_timer.svelte';

	const intervalTimer = getIntervalTimer();
	function handleNext() {
		intervalTimer.handleNext();
	}
</script>

<button onclick={handleNext} class="button primary">Next</button>
