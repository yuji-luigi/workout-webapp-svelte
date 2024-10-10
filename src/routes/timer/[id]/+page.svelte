<script lang="ts">
	import { goto } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import CountInput from '../../../lib/components/counter/CountInput.svelte';
	import type { Timer } from '../../../types/db/timer';
	import TimerSection from './TimerSection.svelte';

	export let data: { timer: Timer };
	let dialog: HTMLDialogElement;
	onMount(async () => {
		// await tick();
		if (dialog) {
			dialog?.showModal();
		}
	});
	onDestroy(() => {
		if (dialog) {
			dialog.close();
		}
	});
</script>

<div class="page">
	{#if data.timer}
		<TimerSection timer={data.timer} />
	{/if}
</div>

<style>
	.page {
		display: grid;
		place-items: center;
		min-height: calc(100dvh - var(--sub-header-height));
	}
	.flex-column {
		gap: 1rem;
		justify-content: center;
		align-items: center;
	}
</style>
