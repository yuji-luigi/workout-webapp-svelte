<script lang="ts">
	import TrashIconSvg from '../icons/svgs/TrashIconSvg.svelte';

	let {
		onclick
	}: {
		onclick?: () => void;
	} = $props();
</script>

<button {onclick}>
	<TrashIconSvg --fill="var(--color-error)" --stroke="#fefefe" size={24} />
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
		background-color: var(--color-error-200);
	}
	button:active {
		transform: scale(0.98);
		background-color: var(--color-error-100);
	}
</style>
