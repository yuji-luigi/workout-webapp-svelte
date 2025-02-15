<script lang="ts">
	import { isExerciseLog } from '../../../../types/db/routine_log';
	import { getRoutineLogStore } from '../../../store/states/routine_log_store.svelte';
	import { getCurrentRoutineStore } from '../../../store/states/routine_store.svelte';
	import { getIntervalTimer } from '../../../store/timers/interval_timer.svelte';
	import Button from '../../button/Button.svelte';
	import IconButton from '../../button/IconButton.svelte';
	import AddSvg from '../../icons/svgs/AddSvg.svelte';
	import MinusSvg from '../../icons/svgs/MinusSvg.svelte';
	const currentRoutine = getCurrentRoutineStore();
	const intervalTimer = getIntervalTimer();
	const logStore = getRoutineLogStore();
</script>

<div>
	<button onclick={() => logStore?.subCurrentExerciseReps()}>
		<MinusSvg />
	</button>
	<p>
		{logStore?.currentLog?.repetition_done.count}/{isExerciseLog(intervalTimer.currentFlow)
			? intervalTimer.currentFlow.exercise.repetition.count
			: 0}
	</p>
	<button onclick={() => logStore?.addCurrentExerciseReps()}>
		<AddSvg />
	</button>
</div>

<style>
	div {
		display: flex;
		align-items: center;
		gap: var(--gap-md);
	}
	button {
		&:hover {
			background-color: var(--color-primary);
		}
	}
</style>
