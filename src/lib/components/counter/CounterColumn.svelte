<script lang="ts">
	import type { resolveRoute } from '$app/paths';

	let {
		value = $bindable(0),
		max,
		min,
		count = 1,
		resolver
	}: {
		count?: number;
		max?: number | undefined;
		min?: number;
		value?: number;
		resolver?: (num: number) => number;
	} = $props();
	let _value = $derived.by(() => {
		if (resolver) {
			return resolver?.(value);
		}
		return value;
	});
	const minusClicked = () => {
		if (min == undefined || value > min) {
			value -= count || 1;
			return;
		}
	};
</script>

<div class="counter user-select-none">
	<button
		class="button"
		onclick={() => {
			if (max && count >= max) {
				return;
			}
			value += count || 1;
		}}>+</button
	>
	<p>
		{_value}
	</p>
	<button class="button" onclick={minusClicked}>−</button>
</div>

<style>
	.counter {
		--font-size: 2rem;
		display: grid;
		grid-template-rows: auto auto auto; /* Single column with three rows */
		place-self: center;
		place-items: center;
		gap: 0.5rem;
		font-size: var(--font-size);
	}
	.counter .button {
		padding: 1rem;
		font-size: var(--font-size);
		display: flex;
		justify-content: center;
		align-items: center;
		width: 1rem;
		height: 1rem;
		overflow: hidden;
		border-radius: 900px;
		color: var(--text-color-black);
	}
</style>
