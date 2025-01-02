<script lang="ts">
	import { getContext, onMount, setContext } from 'svelte';
	import { parseFormDataToObjects } from '../../helpers/form-helper/parse_data_to_object';
	import { sleep } from '../../helpers/sleep';
	import { getForm, getFormIDContext, resetForm, setForm } from '../../store/form-store.svelte';
	import FormContext from './FormContext.svelte';
	import type { EventHandler } from 'svelte/elements';
	import { validateForm } from '../../helpers/form-helper/form_validator';
	import type { FormTableField } from '../../../types/form/form-table-field';
	import { resetFormError } from '../../helpers/form-helper/setFormErrors';

	let {
		loading,
		className = '',
		handleSubmit,
		children
	}: {
		loading?: boolean;
		className?: string | undefined;
		handleSubmit?: (
			event: SubmitEvent & { target: HTMLFormElement },
			payload: Record<string, any>
		) => Promise<void>;
		children?: any;
	} = $props();
	let multiNames: string[] = [];
	let form_id = getFormIDContext();
	let form = $state(getForm(form_id));
	// let isDebugForm = getContext('is_debug_form');
	let isDebugForm = false;
	const formTableJson = getContext('form_table_json');

	// handle shape of the form data. creates js object and array from form data and pass it to the handleSubmit function above root form
	async function onsubmit(event: any) {
		try {
			event.preventDefault();
			if (!event || !event.target) return;
			const form_data = new FormData(event.target as HTMLFormElement);
			const submitPayload = parseFormDataToObjects(form_data, multiNames);
			validateForm(submitPayload, formTableJson as FormTableField[], event.target);
			loading = true;
			await handleSubmit?.(event, submitPayload);
			await sleep(1000);
		} catch (error: any) {
			console.error(error);
		}
		loading = false;
	}
	let formEl: HTMLFormElement | undefined = $state();

	onMount(() => {
		const multiSelects = formEl?.querySelectorAll('select[multiple]') as
			| NodeListOf<HTMLSelectElement>
			| undefined;
		multiNames =
			multiSelects
				?.values()
				.map((field) => field.name)
				.toArray() || [];
		formEl?.addEventListener('input', async (event) => {
			await sleep(200); // wait for the input to finish
			const form_data = new FormData(formEl);
			const dto = parseFormDataToObjects(form_data, multiNames);
			setForm(form_id, dto);
			resetFormError(event.target as HTMLElement);
		});
		return () => resetForm();
	});

	$effect(() => {
		form = getForm(form_id);
	});
</script>

<FormContext {form_id}>
	<div class={className + ' form-grid'}>
		<fieldset class="form-grid-fieldset" disabled={loading} aria-busy={loading}>
			{#if form_id}
				<form bind:this={formEl} id={form_id} {onsubmit}>
					{@render children?.()}
				</form>
			{:else}
				<form {onsubmit}>
					{@render children?.()}
				</form>
			{/if}
		</fieldset>
	</div>
	{#if isDebugForm}
		<pre>
      form: {JSON.stringify(form, null, 2)}
    </pre>
	{/if}
</FormContext>

<style>
	fieldset {
		container-type: inline-size;
		border: none;
		border-radius: 5px;
		padding: 1rem;
		transition: opacity 0.3s ease-in-out;
		&[disabled] {
			opacity: 0.5;
		}
	}

	form {
		max-width: var(--max-width);
		display: grid;
		grid-template-columns: repeat(2, auto 1fr);
		gap: 1rem;
	}

	@container (max-width: 600px) {
		form {
			grid-template-columns: 1fr;
			max-width: 400px;
			margin-inline: auto;
		}
	}
</style>
