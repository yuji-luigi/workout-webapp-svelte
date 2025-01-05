<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Option } from '../../../../types/form/option';
	import InputGroupGrid from '../InputGroupGrid.svelte';
	import SelectInputMulti from './base/SelectInputMulti.svelte';
	import type { FormTableField } from '../../../../types/form/form-table-field';
	import SetConfigureButton from '../../form/form-by-collection/workout-form/workout-set-configure-modal/SetConfigureButton.svelte';
	import { getForm, getFormIDContext } from '../../../store/form-store.svelte';
	import SetConfigureSection from '../../form/form-by-collection/workout-form/workout-set-configure-modal/SetConfigureSection.svelte';

	let {
		className,
		label,
		name,
		...other
	}: FormTableField & {
		name: string;
		label: string;
		className?: string;
		input: Snippet;
		loading: boolean;
	} = $props();
	const form_id = getFormIDContext();
	let formState = $derived(getForm(form_id));
	let totalWSets = $derived(formState?.workout_sets?.length || 0);
	let totalExercises = $derived(
		formState?.workout_sets.reduce((acc: any, set: any) => acc + set.exercises?.length || 0, 0) || 0
	);
</script>

<InputGroupGrid {className} {label} {name}>
	{#snippet input()}
		<div>
			<p>{totalWSets} sets {totalExercises} exercises</p>
			<!-- <SelectInputMulti {name} {...other as any} /> -->
			<SetConfigure Section {name} />
		</div>
	{/snippet}
</InputGroupGrid>

<style>
	p {
		width: 100%;
		white-space: nowrap;
		text-align: right;
	}
	div {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		gap: var(--spacing-sm);
	}
</style>
