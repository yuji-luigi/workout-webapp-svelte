<script lang="ts">
	import { goto } from '$app/navigation';
	import { getStores } from '$app/stores';
	import { closeDialog } from '../../../store/global-dialog-store.svelte';
	import { getTimerTime } from '../../../helpers/formatTimerTime';
	import DialogActions from '../DialogActions.svelte';
	import type { Interval } from '$types/db/interval';

	export let interval: Interval;
	let sets = 1;

	function handlePush() {
		closeDialog();
		goto(`/timers/${interval.id}?sets=${sets}`);
	}
</script>

<div class="contents">
	<img src={interval.image.split('(')[1].split(')')[0]} alt="" height="300px" />
	<h5>Time: {getTimerTime(interval.seconds)}</h5>

	<div class="counter-section">
		<h4>How many sets?</h4>
		<div class="counter">
			<button
				class="button"
				on:click={() => {
					if (sets > 1) {
						{
							sets--;
						}
					}
				}}>-</button
			>
			{sets}
			<button
				class="button"
				on:click={() => {
					sets++;
				}}>+</button
			>
		</div>
	</div>
</div>
<div class="actions flex-row sm-column">
	<button class="button">Back</button>
	<button on:click={handlePush} class="button">Confirm</button>
</div>

<style>
	:root {
		--gap: 0.5rem;
	}
	.contents {
		display: grid;
		place-content: center;
		place-items: center;
		gap: var(--gap);
	}

	.counter-section {
		display: grid;
		place-content: center;
		gap: var(--gap);
	}
	.flex-row {
		gap: var(--gap);
	}
	.counter {
		display: grid;
		place-self: center;
		place-items: center;
		grid-template-columns: repeat(3, 1fr);
		& button {
			--size: 2rem;
			padding: 0;
			width: var(--size);
			height: var(--size);
			font-size: var(--font-size-lg);
			border-radius: 900px;
			color: var(--text-color-black);
		}
	}
	.actions {
		margin-top: 1rem;
	}
	.button {
		width: 100%;
	}
</style>
