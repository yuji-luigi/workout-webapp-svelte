<script lang="ts">
	import { onMount } from 'svelte';
	import { sleep } from '../../../../helpers/sleep';
	import type { Option } from '../../../../../types/form/option';
	import type { FormTableField } from '../../../../../types/form/form-table-field';
	import type { Collection } from '../../../../../types/db/collections';
	import { db_state_getter } from '../../../../store/lofi-db/workout-lofi.svelte';
	import { isRedirect } from '@sveltejs/kit';
	import { createWebsocketStates } from '../../../../store/socket-store.svelte';
	let {
		label,
		className,
		options = [],
		input,
		collection,
		name,
		width = '100%',
		textAlign,
		placeholder,
		...others
	}: {
		className?: string;
		options?: Option[];
		input?: any;
		width?: string;
		textAlign?: string;
	} & Omit<FormTableField, 'type'> = $props();
	const socketStates = createWebsocketStates();
	socketStates.setGlobalWebSocket(new WebSocket('ws://localhost:1234'));

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
	});
	$effect(() => {
		if (socketStates.globalWebSocket) {
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
		}
	});
</script>

<select
	style={`--width:${width}; --text-align:${textAlign};`}
	{name}
	placeholder="select option"
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
		width: var(--width, 100%);
		text-align: var(--text-align);
		padding: 0.5rem;
		border-radius: 4px;
		min-height: 2.5rem;
	}
</style>
