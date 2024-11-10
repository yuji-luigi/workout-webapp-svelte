<script lang="ts">
	import { onMount } from 'svelte';
	import { sleep } from '../../helpers/sleep';
	import { handleArrayFormData } from '../../helpers/form-helper/handle-array-form-data';
	import { parseFormDataToObjects } from '../../helpers/form-helper/parse_data_to_object';
	import { resetForm, setForm } from '../../store/form-store.svelte';

	let {
		loading,
		className,
		handleSubmit,
		children,
		form_id = 'id_null'
	}: {
		loading?: boolean;
		className?: string | undefined;
		handleSubmit?: (
			payload: Record<string, any>,
			event: SubmitEvent & { target: HTMLFormElement }
		) => Promise<void>;
		children?: any;
		form_id?: string;
	} = $props();

	async function onsubmit(event: SubmitEvent & { target: HTMLFormElement }) {
		try {
			loading = true;
			const form_data = new FormData(event.target as HTMLFormElement);
			const submitPayload = parseFormDataToObjects(form_data);
			await handleSubmit?.(submitPayload, event);
			await sleep(1000);
		} catch (error: any) {
			throw new Error(error);
		}
		loading = false;
	}
	let formEl: HTMLFormElement | undefined = $state();

	onMount(() => {
		const multiSelects = formEl?.querySelectorAll('select[multiple]') as
			| NodeListOf<HTMLSelectElement>
			| undefined;
		const multiNames =
			multiSelects
				?.values()
				.map((field) => field.name)
				.toArray() || [];
		formEl?.addEventListener('input', async (event) => {
			await sleep(200); // wait for the input to finish
			const form_data = new FormData(formEl);
			const dto = parseFormDataToObjects(form_data, multiNames);
			setForm(form_id, dto);
		});

		return () => resetForm();
	});
</script>

<div class={className}>
	<fieldset disabled={loading} aria-busy={loading}>
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
