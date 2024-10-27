<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import InputGroupGrid from '../../input/InputGroupGrid.svelte';
	let { className = '', name = '', type = 'number', ...other } = $props();
	let selectedWorkouts = [];
	function handleSelectChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		selectedWorkouts = Array.from(target.selectedOptions).map((option) => option.value);
		console.log('Updated selected workouts:', selectedWorkouts);
	}
	onMount(() => {
		const selectEl = document.querySelectorAll('input.select-checkbox') as HTMLInputElement[];
		console.log('selectEl:', selectEl);
		selectEl.forEach((el) => addEventListener('', handleSelectChange));
	});
	onDestroy(() => {
		// Remove the event listener when the component is destroyed
		selectElement.removeEventListener('change', handleSelectChange);
	});
</script>

<InputGroupGrid label="Timer setting for workouts" {className} hidden={false}>
	{#snippet input()}
		<input {name} {type} {...other} />
	{/snippet}
</InputGroupGrid>
