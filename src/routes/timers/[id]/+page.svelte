<script lang="ts">
	import { onMount } from 'svelte';
	import { getTimerTime } from '../../../lib/helpers/formatTimerTime';
	import type { Timer } from '../../../types/db/timer';
	import { openDialog } from '../../../store/dialog-store';
	import TimerDialog from './TimerDialog.svelte';

	export let data: { timer: Timer };
	let dialog: HTMLDialogElement;
	onMount(() => {
		openDialog({
			componentInDialog: {
				component: TimerDialog,
				props: { timer: data.timer }
			}
		});
	});
</script>

<dialog class="dialog" bind:this={dialog}>
	{#if data.timer}
		<h1>{data.timer.name}</h1>
		<p>{data.timer.description}</p>
		<p class="timer-number">{getTimerTime(data.timer.seconds)}</p>
	{/if}
</dialog>

<style>
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
