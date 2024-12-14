<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Option } from '../../../../types/form/option';
	import InputGroupGrid from '../InputGroupGrid.svelte';
	import SelectInputMulti from './base/SelectInputMulti.svelte';
	import type { FormTableField } from '../../../../types/form/form-table-field';
	import ExerciseConfigureButton from '../../form/form-by-collection/workout-form/exercise-configuration-inputs/ExerciseConfigureButton.svelte';

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
</script>

<InputGroupGrid {className} {label} {name}>
	{#snippet input()}
		<div>
			<SelectInputMulti {name} {...other as any} />
			<ExerciseConfigureButton />
		</div>
	{/snippet}
</InputGroupGrid>

<style>
	div {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}
</style>
