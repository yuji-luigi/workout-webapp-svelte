<script lang="ts">
	import { onMount, onDestroy, type Snippet } from 'svelte';
	import Chip from '$lib/components/chip/Chip.svelte';
	import type { Option } from '$types/form/option';
	export let className: string = '';
	export let loading = true;
	export let name;
	export let endComponent: Snippet | null;
	let open = false;
	export let options: Option[] = [];
	// they are the same the values are the mapped values of selectedOptions to avoid mapping again
	let selectedOptions: Option[] = [];
	let selectedValues: string[] = [];
	let selectElement: HTMLSelectElement;
	let selectContainer: HTMLDivElement;

	function toggleSelection(selected: Option) {
		const { value } = selected;
		if (selectedValues.includes(String(value))) {
			selectedOptions = selectedOptions.filter((selected) => selected.value !== value);
		} else {
			selectedOptions = [...selectedOptions, selected];
		}
		selectedValues = selectedOptions.map((selected) => selected.value.toString());
		updateSelectOptions();
	}

	function removeSelectOption(event: MouseEvent) {
		if (event.target instanceof HTMLElement) {
			const chip = event.target.closest('.chip');
			if (chip) {
				event.stopImmediatePropagation();
				const key = chip.getAttribute('data-key'); // key is the value of the option.
				// selectedOptions = selectedOptions.filter((option) => option.value.toString() !== key);
				// selectedValues = selectedOptions.map((option) => option.value.toString());
				// updateSelectOptions();
				// from here I am trying to trigger the form input event to update the selected_workouts in the form.
				const checkbox = document.querySelector(
					`.select-checkbox[value="${key}"]`
				) as HTMLInputElement;
				if (checkbox) {
					// Uncheck the checkbox
					checkbox.checked = false;
					// Optionally, you might want to trigger a change event as well
					const changeEvent = new Event('change', { bubbles: true });
					checkbox.dispatchEvent(changeEvent);
					// Create and dispatch the input event
					const inputEvent = new Event('input', { bubbles: true });
					checkbox.dispatchEvent(inputEvent);
				}
			}
		}
	}

	function updateSelectOptions() {
		if (selectElement) {
			Array.from(selectElement.options).forEach((option) => {
				option.selected = selectedValues.includes(option.value);
			});
		}
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
</script>

<div class={`${className} select-container`} bind:this={selectContainer}>
	<!-- <input type="text" on:focus={handleOnfocus} readonly placeholder="Select options" /> -->
	<div
		role="button"
		tabindex="0"
		on:click={handleOnfocus}
		on:keydown={null}
		class={`input flex-row select-input-div ${className}`}
	>
		{#if selectedOptions.length === 0}
			Select options
		{/if}
		<div class="chips-container">
			{#each selectedOptions as option}
				<Chip data_set_key={option.value.toString()}>{option.label}</Chip>
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
		{#each options as option}
			<label class="checkbox-label">
				<input
					class="select-checkbox"
					type="checkbox"
					value={option.value}
					checked={selectedValues.includes(String(option.value))}
					on:change={() => toggleSelection(option)}
				/>
				{option.label}
			</label>
		{/each}
	</div>

	<!-- Hidden select element for form submission -->
	<select class="workouts-select" {name} multiple bind:this={selectElement} hidden>
		{#each options as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
</div>

<style>
	.select-container {
		width: 100%;
		position: relative;
	}
	.input.flex-row {
		align-items: center;
	}

	.custom-select {
		height: 0;
		overflow: hidden;
		background-color: var(--fg-color);
	}
	.custom-select[data-open='true'] {
		display: flex;
		transition: height 1.3s ease-in-out;
		flex-direction: column;
		padding: 1rem;
		border-radius: 4px;
		height: auto;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
	}

	input[type='checkbox'] {
		margin-right: 0.5rem;
		flex: 0;
	}

	.chips-container {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
	}
</style>
