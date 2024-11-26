<script lang="ts">
	import { getContext } from 'svelte';
	import type { WorkoutJoined } from '../../../../../types/db/workout';
	import { sleep } from '../../../../helpers/sleep';
	import { getForm } from '../../../../store/form-store.svelte';
	import { counterDialogStates } from '../../../dialog/count-dialog/count-dialog-states.svelte';
	import TimeCounter from '../../../time-counter/TimeCounter.svelte';
	import TimeCounterInForm from '../../../time-counter/TimeCounterInForm.svelte';
	let { name }: { name: string } = $props();

	let n_sets = $state(1);
	let form = getContext('form');
	async function onclick() {
		counterDialogStates.content = TimeCounterInForm as any;
		// counterDialogStates.form_id;
		counterDialogStates.data.count = n_sets;
		await sleep(100);
		counterDialogStates.isOpen = true;
	}
</script>

<button type="button" class="input-group">
	<input value={n_sets} type="text" {name} />
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
	input {
		width: 3rem;
		text-align: center;
		border: none;
	}
</style>
