<script lang="ts">
	import type { Collection } from '../../../../../types/db/collections';
	import type { FormTableField } from '../../../../../types/form/form-table-field';
	import type { Option } from '../../../../../types/form/option';
	import { lofi_db } from '../../../../store/lofi-db/lofi_db.svelte';
	let {
		label,
		className,
		options = [],
		collection,
		name,
		width = '100%',
		textAlign,
		placeholder,
		selectedOption = $bindable(null),
		...others
	}: {
		selectedOption?: string | null;
		className?: string;
		options?: Option[];
		width?: string;
		textAlign?: string;
	} & Omit<FormTableField, 'type'> = $props();

	// Handle changes to the select
	// let selectedOption = $state('');
	let _options = $state(options);
	let loading = $state(true);

	$effect(() => {
		if (collection) {
			_options =
				lofi_db?.db_state_getter[collection as Collection]?.map((data) => {
					return {
						id: data.id,
						value: JSON.stringify(data),
						label: data.name
					};
				}) || [];
		}
		loading = false;
	});
</script>

<select
	style={`--width:${width}; --text-align:${textAlign};`}
	{name}
	class={className}
	bind:value={selectedOption}
	{...others}
>
	{#if !loading && _options.length === 0}
		<option hidden value="">No options found...</option>
	{:else}
		<option disabled value="">{placeholder}</option>
	{/if}

	{#each _options as option}
		<option selected={option.value === selectedOption} value={option.value}>{option.label}</option>
	{/each}
	{#if loading}
		<option>Loading...</option>
	{/if}
</select>

<style>
	select {
		opacity: var(--opacity, 1);
		width: var(--width, 100%);
		text-align: var(--text-align);
		padding: 0.5rem;
		border-radius: 4px;
		min-height: 2.5rem;
		position: var(--position);
	}
</style>
