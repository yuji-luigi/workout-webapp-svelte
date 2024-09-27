<script lang="ts">
	import ProgressSvg from '../../../lib/components/progress/progress-svg/ProgressSvg.svelte';
	import TimerWatch from '../../../lib/components/timer/TimerWatch.svelte';
	import { getTimerTime } from '../../../lib/helpers/formatTimerTime';
	import type { Timer } from '../../../types/db/timer';

	export let timer: Timer;
</script>

<div class="contents">
	<TimerWatch {timer} />
</div>
<div class="actions flex-row sm-column">
	<button class="button-primary">Back</button>
	<button class="button-primary">Confirm</button>
</div>
