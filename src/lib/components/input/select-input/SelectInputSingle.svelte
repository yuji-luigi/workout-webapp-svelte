<script lang="ts">
	import { onMount } from 'svelte';
	import { sleep } from '../../../helpers/sleep';
	import type { Option } from '../../../../types/form/option';
	export let loading = true;
	export let name;

	export let options: Option[] = [];
	// Handle changes to the select
	export let selectedOption: string = '';

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

<select {name} on:change={handleSelect}>
	{#if !!options.length}
		<option disabled selected hidden>please select...</option>
	{/if}
	{#each options as option}
		<option value={option.value}>{option.label}</option>
	{/each}
	{#if loading}
		<option>Loading...</option>
	{/if}
	{#if !loading && options.length === 0}
		<option disabled selected hidden>No options found...</option>
	{/if}
</select>

<style>
	select {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		min-height: 2.5rem;
	}
	select[multiple] {
		height: auto; /* Allow the select to expand with multiple options */
	}
</style>
