<script lang="ts">
	import { onMount } from 'svelte';
	import type { WSetJoined } from '../../../../../../../types/db/WSetI';
	import SelectInputSingle from '../../../../../input/select-input/base/SelectInputSingle.svelte';
	import SetNumberInput from '../inputs/SetNumberInput.svelte';
	import TimerInputWithDialog from '../inputs/TimerInputWithDialog.svelte';
	import { getForm, getFormIDContext } from '../../../../../../store/form-store.svelte';

	let {
		index,
		preName,
		wSet,
		removeSet,
		selectedType = $bindable()
	}: {
		index: number;
		preName: string;
		selectedType: string;
		wSet: Omit<WSetJoined, 'id'>;
		// parsedSelectedType: WSetTypeI | null;
		removeSet: (index: number) => void;
	} = $props();
	let selectEl = $state<HTMLSelectElement>();
	// let selectedType = $state(wSet.type ? JSON.stringify(wSet.type) : '');
	let parsedSelectedType = $derived(selectedType ? JSON.parse(selectedType) : null);

	// if possible use other than effect to update the selectedType. tried derived but need to update from select input too.
	$effect(() => {
		selectedType = wSet.type ? JSON.stringify(wSet.type) : '';
	});

	function handleRemoveSet() {
		removeSet(index);
	}
</script>

<div class="set-config-header">
	<div class="main-header">
		<h2 class="full-width">SET#{index + 1}</h2>
		<button onclick={handleRemoveSet} type="button" class="error button delete-button"
			>remove</button
		>
	</div>
	<div class="flex-column set-config-group">
		<SelectInputSingle
			bind:selectEl
			bind:selectedOption={selectedType}
			width="auto"
			label="set type"
			collection="workout_set_type"
			name={preName + '.workout_set_type'}
			placeholder="type of set"
			required
			textAlign="center"
		/>
		<SetNumberInput name={preName + '.n_set'} />
	</div>
	<div class="set-level-timers full-width">
		{#if !parsedSelectedType?.use_exercise_timer}
			{#if parsedSelectedType?.use_rest_time}
				<TimerInputWithDialog name={preName + '.set_rest_time'} suffix="rest time" />
			{/if}
			{#if parsedSelectedType?.use_active_time}
				<TimerInputWithDialog name={preName + '.set_active_time'} suffix="active time" />
			{/if}
		{/if}
	</div>
</div>

<style>
	.set-config-header {
		gap: var(--spacing-sm);
	}
	.main-header {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		justify-content: center;
		align-items: start;
	}
	.set-level-timers {
		display: grid;
		grid-template-columns: 1fr 1fr;
		place-content: center;
		place-items: center;
		gap: var(--spacing-xs);
	}
	.set-config-group {
		display: grid;
		gap: var(--spacing-sm);
	}

	.delete-button {
		padding: 0.15rem 0.3rem;
		border-radius: 3px;
	}
	.set-config-header {
		align-items: start;
		h2 {
			place-self: start;
		}
		display: grid;
		grid-template-columns: 1fr auto;
		column-gap: var(--spacing-md);
	}
</style>
