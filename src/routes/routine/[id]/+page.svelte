<script lang="ts">
	import { goto } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import CountInput from '../../../lib/components/counter/CountInput.svelte';
	import TimerSection from './TimerSection.svelte';
	import type { RoutineJoined } from '../../../types/db/routine';
	import { page } from '$app/stores';
	import { db } from '../../../lib/db/dexie-db/dexie-db';
	let routine: RoutineJoined | undefined = $state();
	let dialog: HTMLDialogElement;
	onMount(async () => {
		if ($page.params.id) {
			routine = await db.routine.get({ id: Number($page.params.id) });
			console.log($page.params.id);
			console.log(routine);
		}
	});

	onDestroy(() => {
		if (dialog) {
			dialog.close();
		}
	});
</script>

<div class="page">
	{#if routine}
		<TimerSection {routine} />
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
