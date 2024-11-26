<script lang="ts">
	import type { WorkoutJoined } from '../../../../../types/db/workout';
	import { sleep } from '../../../../helpers/sleep';
	import { getForm } from '../../../../store/form-store.svelte';
	import { counterDialogStates } from '../../../dialog/count-dialog/count-dialog-states.svelte';
	import TimeCounter from '../../../time-counter/TimeCounter.svelte';
	import TimeCounterInForm from '../../../time-counter/TimeCounterInForm.svelte';
	let {
		workout,
		index,
		form_id,
		label,
		name
	}: {
		index: number;
		form_id: string;
		workout: WorkoutJoined;
		name: string;
		label: string;
	} = $props();

	let time = $state(1);
</script>

<button type="button" class="input-group">
	<input value={time} {name} type="text" />
	<span> {label}</span>
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
	input {
		width: 3rem;
		text-align: center;
		border: none;
	}
</style>
