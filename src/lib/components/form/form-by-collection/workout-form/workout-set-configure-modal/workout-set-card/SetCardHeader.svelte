<script lang="ts">
	import type { WSetJoined } from '../../../../../../../types/db/WSetI';
	import { getFormIDContext } from '../../../../../../store/form-store.svelte';
	import Button from '../../../../../button/Button.svelte';
	import SelectInputSingle from '../../../../../input/select-input/base/SelectInputSingle.svelte';
	import SetNumberInput from '../inputs/SetNumberInput.svelte';
	import TimerInputWithDialog from '../inputs/TimerInputWithDialog.svelte';

	let {
		index,
		preName,
		wSets = $bindable([]),
		selectedType = $bindable(),
		parsedSelectedType
	}: {
		index: number;
		wSets: Omit<WSetJoined, 'id'>[];
		preName: string;
		selectedType: string;
		parsedSelectedType: WSetTypeI | null;
	} = $props();
	const form_id = getFormIDContext();
	function handleRemoveSet() {
		wSets.splice(index, 1);
		const formEl = document.getElementById(form_id);
		formEl?.dispatchEvent(new Event('input', { bubbles: true }));
	}
</script>

<div class="set-config-header">
	<div class="main-header">
		<h2 class="full-width">SET#{index + 1}</h2>
		<button onclick={handleRemoveSet} type="button" class="error button delete-button"
			>remove</button
		>
	</div>
	<div class="flex-column">
		<SelectInputSingle
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
		{#if !parsedSelectedType?.has_timer_per_exercise}
			{#if parsedSelectedType?.use_rest_time}
				<TimerInputWithDialog name={preName + '.timer_seconds_rest'} suffix="rest time" />
			{/if}
			{#if parsedSelectedType?.use_active_time}
				<TimerInputWithDialog name={preName + '.timer_seconds_active'} suffix="active time" />
			{/if}
		{/if}
	</div>
</div>

<style>
	.main-header {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		justify-content: center;
		align-items: center;
	}
	.set-level-timers {
		display: grid;
		grid-template-columns: 1fr 1fr;
		place-content: center;
		place-items: center;
		gap: var(--spacing-xs);
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
