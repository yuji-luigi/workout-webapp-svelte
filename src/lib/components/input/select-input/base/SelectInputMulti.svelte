<script lang="ts">
	import {
		onMount,
		onDestroy,
		type Snippet,
		getContext,
		hasContext,
		getAllContexts,
		setContext
	} from 'svelte';
	import Chip from '$lib/components/chip/Chip.svelte';
	import type { Option } from '$types/form/option';
	import { getForm, setForm } from '../../../../store/form-store.svelte';
	import { sleep } from '../../../../helpers/sleep';
	import ChipInput from '../../../chip/ChipInput.svelte';

	let {
		className,
		loading = false,
		name,
		endComponent,
		options
	}: {
		className?: string;
		loading?: boolean;
		name: string;
		endComponent?: Snippet | null;
		options: Option[];
	} = $props();
	let open = $state(false);
	const form_id = getContext('form_id') as string;
	// they are the same the values are the mapped values of selectedOptions to avoid mapping again
	let selectedOptions: Option[] = $state([]);
	// let selectedValues: string[] = $state([]);
	let selectElement: HTMLSelectElement;
	let selectContainer: HTMLDivElement;
	let form = $state(getForm(getContext('form_id')));

	/** handle select from dropdown */
	async function toggleSelection(selected: Option) {
		const { value } = selected;
		if (selectedOptions.map((option) => option.value.toString()).includes(String(value))) {
			selectedOptions = selectedOptions.filter((selected) => selected.value !== value);
		} else {
			selectedOptions = [...selectedOptions, selected];
		}
		updateFormBySelectedOptionsState();
	}

	/** onClick the chip in fake select input box */
	function removeSelectOption(event: MouseEvent) {
		if (event.target instanceof HTMLElement) {
			const chip = event.target.closest('.chip');
			if (chip) {
				event.stopImmediatePropagation();
				const key = chip.getAttribute('data-key');
				selectedOptions = selectedOptions.filter((option) => {
					console.log({ option, key });
					option.id.toString() !== key?.toString();
				});
				updateFormBySelectedOptionsState();
			}
		}
	}

	async function updateFormBySelectedOptionsState() {
		const formEl = document.getElementById(form_id) as HTMLFormElement;
		formEl.dispatchEvent(new Event('input'));
	}

	// Open the dropdown when focusing the input
	function handleOnfocus(event: FocusEvent) {
		if (
			event.target instanceof HTMLElement &&
			(event.target.className.includes('select-input-div') ||
				event.target.parentElement?.classList.contains('select-input-div'))
		) {
			open = !open;
		}
	}

	// Close the dropdown if clicked outside the component
	function handleClickOutside(event: MouseEvent) {
		if (selectContainer && !selectContainer.contains(event.target as Node)) {
			open = false;
		}
	}

	// Attach global pclick listener on mount to detect outside clicks
	onMount(() => {
		if (typeof document !== 'undefined') {
			document.addEventListener('click', handleClickOutside);
			selectContainer.addEventListener('click', removeSelectOption);
		}
	});

	// Clean up the listener on destroy
	onDestroy(() => {
		if (typeof document !== 'undefined') {
			document.removeEventListener('click', handleClickOutside);
		}
	});
	$effect(() => {
		form = getForm('routine-form');
	});
</script>

<div class={`${className} select-container`} bind:this={selectContainer}>
	<!-- <input type="text" on:focus={handleOnfocus} readonly placeholder="Select options" /> -->
	<div
		role="button"
		tabindex="0"
		onclick={handleOnfocus}
		onkeydown={null}
		class={`input flex-row select-input-div ${className}`}
	>
		{#if selectedOptions.length === 0}
			Select options
		{/if}
		<div class="chips-container">
			{#each selectedOptions as option, index}
				<ChipInput
					value={option.value.toString()}
					name={`${name}[${index}]`}
					data_set_key={option.id}>{option.label}</ChipInput
				>
			{/each}
		</div>
		{@render endComponent?.()}
	</div>
	<div data-open={open} class="custom-select">
		{#if loading}
			<p>Loading...</p>
		{/if}

		{#if !loading && options.length === 0}
			<p>No options found...</p>
		{/if}

		<!-- Render checkboxes for each option -->

		{#each options as option, index}
			<div
				role="button"
				class="select-checkbox"
				data-key={option.id || option.value}
				data-checked={selectedOptions
					.map((option) => option.value.toString())
					.includes(String(option.value))}
				onclick={() => toggleSelection(option)}
				tabindex={index}
				onkeydown={null}
			>
				{option.label}
			</div>
		{/each}
	</div>
	<!-- No more select use only the checkbox input with index in square brackets. must be used with the parseFormDataToObjects function in this case -->
	<!-- Hidden select element for form submission -->
	<!-- <select class="workouts-select" {name} multiple bind:this={selectElement} hidden>
      {#each options as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select> -->
</div>

<style>
	.select-container {
		width: 100%;
		position: relative;
	}
	.input.flex-row {
		align-items: center;
	}

	/* TODO: transition to optimize(no height. use transform or opacity) */
	.custom-select {
		display: flex;
		max-height: 0;
		/* gap: 0.25rem; */
		flex-direction: column;
		overflow: hidden;
		background-color: var(--fg-color);
		position: absolute;
		width: 100%;
		/* transition: max-height 1.3s ease-in-out; */
	}
	.custom-select[data-open='true'] {
		/* padding: 1rem; */
		transition: max-height 1.3s ease-in-out;
		border-radius: 4px;
		max-height: 600px;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
	}

	.select-checkbox {
		padding-inline: 1rem;
		padding-block: 0.5rem;
		cursor: pointer;
		&[data-checked='true'] {
			background-color: var(--color-primary);
			color: var(--color-text-white);
		}
	}
	.chips-container {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
	}
</style>
