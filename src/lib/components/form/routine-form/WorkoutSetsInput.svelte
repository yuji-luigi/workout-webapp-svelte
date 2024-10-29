<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import InputGroupGrid from '../../input/InputGroupGrid.svelte';
	let { className = '', name = '', type = 'number', ...other } = $props();
	let selectedWorkouts = [];
	let selectEls: HTMLInputElement[] | undefined;
	function handleSelectChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		selectedWorkouts = Array.from(target.selectedOptions).map((option) => option.value);
	}
	onMount(() => {
		selectEls = document.querySelectorAll('input.select-checkbox') as unknown as
			| HTMLInputElement[]
			| undefined;
		selectEls?.forEach((el) => addEventListener('', handleSelectChange));
	});
	onDestroy(() => {
		// Remove the event listener when the component is destroyed
		selectEls?.forEach((el) => el.removeEventListener('change', handleSelectChange));
	});
</script>

<InputGroupGrid label="Timer setting for workouts" {className} hidden={false}>
	{#snippet input()}
		<input {name} {type} {...other} />
	{/snippet}
</InputGroupGrid>
