<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { FormTableField } from '../../../types/form/form-table-field';
	import InputController from '../input/input-controller/InputController.svelte';
	import { excludeFormHidden } from './filterInputs';
	import FormGrid from './FormGrid.svelte';

	let {
		formTableFields,
		className,
		handleSubmit,
		actions
		// defaultValues
	}: {
		formTableFields: FormTableField[];
		className?: string;
		// defaultValues?: Record<string, any>;
		handleSubmit: (
			event: SubmitEvent & { target: HTMLFormElement },
			payload: Record<string, any>
		) => Promise<void>;
		actions?: Snippet;
	} = $props();
	let loading = false;
</script>

<FormGrid {handleSubmit} {loading} {className}>
	{#each formTableFields.filter(excludeFormHidden) as formTableField}
		<InputController {formTableField} />
	{/each}
	{#if actions}
		{@render actions()}
	{:else}
		<div class="fullWidth flex-column button-div">
			<button class="button" type="submit">Submit</button>
		</div>{/if}
</FormGrid>

<style>
	.fullWidth {
		grid-column: 1/-1;
	}
	.button {
		width: unset;
		margin-left: auto;
	}
</style>
