<script lang="ts">
	import type { WorkoutJoined } from '../../../../../types/db/workout';
	import { openDialog } from '../../../../store/global-dialog-store';
	import { countDialogStates } from '../../../dialog/count-dialog/count-dialog-states.svelte';
	import VideoHero from '../../../hero/video-hero/VideoHero.svelte';
	import TimeCounter from '../../../time-counter/TimeCounter.svelte';
	let {
		isOpenCounterModal = $bindable(),
		workout
	}: {
		workout: WorkoutJoined;
		isOpenCounterModal: boolean;
	} = $props();

	let n_sets = $state(1);
	let dialogStates = $state(countDialogStates().states);
</script>

<button
	type="button"
	class="input-group"
	onclick={() => {
		dialogStates.content = TimeCounter as any;
		dialogStates.test = workout.exercise_name;
		console.log(dialogStates.test);
		// dialogStates.actions = null;
		// dialogStates.setDataById({ id: workout.id, data: { n_sets } });
		isOpenCounterModal = true;
	}}
>
	{n_sets}
	<span> Sets</span>
</button>

<style>
	.input-group {
		display: grid;
		grid-column: 1/-1;
		grid-template-columns: subgrid;
		justify-content: end;
		align-items: center;
		gap: var(--spacing-sm);
		font-size: var(--font-size-md);
		justify-items: end;
		cursor: pointer;
	}
</style>
