<script lang="ts">
	import { getIntervalTimer } from '../../../store/timers/interval_timer.svelte';

	const intervalTimer = getIntervalTimer();
	function handlePrev() {
		intervalTimer.handlePrev();
	}
</script>

<button onclick={handlePrev} class="button primary">Prev</button>
