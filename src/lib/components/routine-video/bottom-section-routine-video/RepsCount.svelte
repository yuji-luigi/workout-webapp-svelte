<script lang="ts">
	import { getCurrentRoutineStore } from '../../../store/states/routine_store.svelte';
	import { getIntervalTimer } from '../../../store/timers/interval_timer.svelte';
	import Button from '../../button/Button.svelte';
	import IconButton from '../../button/IconButton.svelte';
	import AddSvg from '../../icons/svgs/AddSvg.svelte';
	import MinusSvg from '../../icons/svgs/MinusSvg.svelte';
	const currentRoutine = getCurrentRoutineStore();
	const intervalTimer = getIntervalTimer();
</script>

<div>
	<button onclick={() => console.log(currentRoutine)}>
		<MinusSvg />
	</button>
	<button class="">
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
