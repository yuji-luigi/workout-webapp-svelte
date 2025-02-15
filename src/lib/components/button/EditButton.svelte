<script lang="ts">
	import EditSvg from '../icons/svgs/EditSvg.svelte';
	import TrashIconSvg from '../icons/svgs/TrashIconSvg.svelte';

	let {
		onclick
	}: {
		onclick?: () => void;
	} = $props();
</script>

<button {onclick} class="edit-button-svg success">
	<EditSvg --stroke="var(--color-primary-200)" size={24} />
</button>

<style>
	button {
		background-color: transparent;
		border: none;
		padding: 0.25rem;
		margin: 0;
		cursor: pointer;
		border-radius: 50%;
		transition: all 0.2s ease-in-out;
	}
	button:hover {
		transform: scale(1.1);
		background-color: var(--color-primary-200);
	}
	button:active {
		transform: scale(0.98);
		background-color: var(--color-primary-100);
	}
</style>
