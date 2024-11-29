<script lang="ts">
	import { onMount } from 'svelte';
	import { sleep } from '../../../../helpers/sleep';
	import type { Option } from '../../../../../types/form/option';
	import type { FormTableField } from '../../../../../types/form/form-table-field';
	import type { Collection } from '../../../../../types/db/collections';
	import { db_state_getter } from '../../../../store/lofi-db/workout-lofi.svelte';
	let {
		label,
		className,
		options = [],
		input,
		collection,
		name,
		width = '100%',
		textAlign,
		borderFocus,
		...others
	}: {
		className?: string;
		options?: Option[];
		input?: any;
		width?: string;
		textAlign?: string;
		borderFocus?: string;
	} & Omit<FormTableField, 'type'> = $props();

	// Handle changes to the select
	let selectedOption = $state('');
	let _options = $state(options);
	let loading = $state(true);

	onMount(() => {
		if (collection) {
			_options = db_state_getter[collection as Collection].map((data) => {
				return {
					// value: workout.id,
					id: data.id,
					value: JSON.stringify(data),
					label: data.name
				};
			});
		}
		loading = false;
	});

	function handleSelect(
		event: Event & {
			currentTarget: EventTarget & HTMLSelectElement;
		}
	) {
		if (event.currentTarget.value === selectedOption) {
			selectedOption = '';
			return;
		}
		selectedOption = event.currentTarget.value;
	}
</script>

<select
	style={`--width:${width}; --text-align:${textAlign}; --border-focus:${borderFocus}`}
	{name}
	onchange={handleSelect}
>
	{#if !!_options.length}
		<option disabled selected hidden>please select...</option>
	{/if}
	{#each _options as option}
		<option selected={option.value === selectedOption} value={option.value}>{option.label}</option>
	{/each}
	{#if loading}
		<option>Loading...</option>
	{/if}
	{#if !loading && _options.length === 0}
		<option disabled selected hidden>No options found...</option>
	{/if}
</select>

<style>
	select {
		--border: none;
		width: var(--width, 100%);
		text-align: var(--text-align);
		padding: 0.5rem;
		border: var(--border, 1px solid #ccc);
		border-radius: 4px;
		min-height: 2.5rem;
		&:focus {
			border: var(--border-focus, 1px solid var(--accent-color));
		}
	}
</style>
