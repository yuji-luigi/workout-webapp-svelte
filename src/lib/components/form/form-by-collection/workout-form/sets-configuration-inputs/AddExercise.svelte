<script lang="ts">
	import Dialog from '../../../../dialog/Dialog.svelte';
	import DialogGeneric from '../../../../dialog/global/DialogGeneric.svelte';
	import ExerciseMenu from '../../../../menu/ExerciseMenu.svelte';

	let { onclick }: { onclick: () => void } = $props();
	let isOpen = $state(false);
	function handleClick() {
		isOpen = true;
	}
</script>

<button onclick={handleClick} type="button" class="input-section button">
	<h3>Add exercise</h3>
</button>
<DialogGeneric maxWidth="sm" bind:isOpen><ExerciseMenu /></DialogGeneric>

<style>
	.input-section {
		color: var(--text-color-white);
		display: grid;
		padding-inline: var(--padding-inline-lg);
		border-radius: var(--border-radius-lg);
		grid-template-columns: 1fr auto auto;
		padding-block: 2rem;
		background-color: var(--gray-700);
	}
</style>
