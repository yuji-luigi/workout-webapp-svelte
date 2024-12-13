<script lang="ts">
	import type { FormTableField } from '../../../types/form/form-table-field';
	import { handleArrayFormData } from '../../helpers/form-helper/handle-array-form-data';
	import { sleep } from '../../helpers/sleep';
	import InputController from '../input/input-controller/InputController.svelte';
	import { excludeFormHidden } from './filterInputs';
	import FormGrid from './FormGrid.svelte';

	let {
		formTableFields,
		className,
		handleSubmit,
		form_id = 'not_set_form_id'
	}: {
		formTableFields: FormTableField[];
		className?: string;
		form_id?: string;
		handleSubmit: (
			event: SubmitEvent & { target: HTMLFormElement },
			payload: Record<string, any>
		) => Promise<void>;
	} = $props();
	let loading = false;
</script>

<FormGrid {handleSubmit} {loading} {className} {form_id}>
	{#each formTableFields.filter(excludeFormHidden) as formTableField}
		<InputController {formTableField} />
	{/each}

	<div class="fullWidth flex-column button-div">
		<button class="button" type="submit">Submit</button>
	</div>
</FormGrid>

<style>
	.sub-grid {
		display: grid;
		grid-template-columns: subgrid;
		gap: 0.5rem;
	}

	.fullWidth {
		grid-column: 1/-1;
	}
	.button {
		width: unset;
		margin-left: auto;
	}
</style>
