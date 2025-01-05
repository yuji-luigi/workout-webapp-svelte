<script lang="ts">
	import { page } from '$app/stores';
	import { db } from '$lib/db/dexie-db/dexie-db';
	import type { RoutineJoined } from '$types/db/routine';
	import { onMount } from 'svelte';
	import SetStepper from './SetStepper.svelte';
	let routine: RoutineJoined | undefined = $state();
	let dialog: HTMLDialogElement;
	onMount(async () => {
		if ($page.params.id) {
			await db.routine.get({ id: Number($page.params.id) }).then((r) => {
				routine = r;
			});
		}
	});
</script>

{#if routine}
	<SetStepper {routine} />
{/if}

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
