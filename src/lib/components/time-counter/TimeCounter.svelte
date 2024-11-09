<script lang="ts">
	import { countDialogStates } from '../dialog/count-dialog/count-dialog-states.svelte';
	import NumberInput from './NumberInput.svelte';

	let {
		max,
		min = 0,
		unit
	}: {
		max?: number | undefined;
		min?: number;
		unit?: string | undefined;
	} = $props();
	let count = $state(countDialogStates.count);
	$effect(() => {
		countDialogStates.count = count;
	});
</script>

<div class="counter">
	<button
		class="button"
		type="button"
		onclick={() => {
			if (count > min) {
				count--;
			}
		}}>-</button
	>
	<h4>
		{unit ? unit + ': ' : ''}
		{count}
	</h4>
	<button
		class="button"
		type="button"
		onclick={() => {
			if (max && count >= max) {
				return;
			}
			count++;
		}}>+</button
	>
</div>

<style>
	:root {
		/** to change the font-size of the counter and button. Change --font-size-scoped value in parent
class of the component*/
		--font-size-scoped: 2rem;
	}

	.counter {
		display: grid;
		place-self: center;
		place-items: center;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		& button {
			padding: 0;
			width: calc(var(--font-size-scoped) + 1rem);
			height: calc(var(--font-size-scoped) + 1rem);
			font-size: var(--font-size-scoped);
			border-radius: 900px;
			color: var(--text-color-black);
		}
	}
	h4 {
		font-size: var(--font-size-scoped);
	}
</style>
