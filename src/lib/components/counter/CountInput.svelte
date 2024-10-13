<script lang="ts">
	export let count = 0;
	export let max: number | undefined;
	export let min = 0;
	export let unit;
</script>

<div class="counter">
	<button
		class="button"
		on:click={() => {
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
		on:click={() => {
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
			color: var(--text-color-dark);
		}
	}
	h4 {
		font-size: var(--font-size-scoped);
	}
</style>
