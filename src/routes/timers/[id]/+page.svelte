<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { getTimerTime } from '../../../lib/helpers/formatTimerTime';
	import type { Timer } from '../../../types/db/timer';
	import TimerDialog from './TimerDialog.svelte';
	import { openDialog } from '../../../store/dialog-store';

	export let data: { timer: Timer };
	let dialog: HTMLDialogElement;

	onMount(() => {
		if (dialog) {
			dialog.showModal();
		}
	});
	onDestroy(() => {
		if (dialog) {
			dialog.close();
		}
	});
</script>

<dialog class="dialog" bind:this={dialog}>
	<div class="dialog-container">
		<div class="dialog-content">
			{#if data.timer}
				<TimerDialog timer={data.timer} />
			{/if}
		</div>
	</div>
</dialog>

<style>
	dialog {
		max-width: 600px;
		background-color: var(--fg);
		border: none;
		position: absolute;
	}
	.container {
		display: grid;
		place-content: center;
		gap: 1rem;
	}
	.not-found-title {
		text-align: center;
	}
	.timer-number {
		font-family: clockicons, sans-serif;
		font-size: 2rem;
	}
</style>
