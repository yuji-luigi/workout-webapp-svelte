<script lang="ts">
	import { getIntervalTimer } from '$lib/store/timers/interval_timer.svelte';
	import PauseIcon from '$lib/components/icons/svgs/PauseIcon.svelte';
	import PlayIcon from '$lib/components/icons/svgs/PlayIcon.svelte';

	const intervalTimer = getIntervalTimer();
	function handleTogglePause() {
		intervalTimer.togglePause();
	}
</script>

<div class="center">
	{#if intervalTimer.isPaused}
		<button onclick={handleTogglePause}>
			<PlayIcon --fill="" --stroke="#fefefe" size={24} />
		</button>
	{:else}
		<button onclick={handleTogglePause}>
			<PauseIcon --fill="#fefefe" --stroke="#fefefe" size={24} />
		</button>
	{/if}
</div>
