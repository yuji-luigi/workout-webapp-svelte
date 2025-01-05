<script lang="ts">
	import { page } from '$app/stores';
	import { db } from '$lib/db/dexie-db/dexie-db';
	import type { RoutineJoined } from '$types/db/routine';
	import { onMount } from 'svelte';
	import SetStepper from './SetStepper.svelte';
	import TimerWatch from '../../../../lib/components/timer/TimerWatch.svelte';
	let routine: RoutineJoined | undefined = $state();
	let dialog: HTMLDialogElement;
	let currentIndex = $state(0);
	onMount(async () => {
		if ($page.params.id) {
			await db.routine.get({ id: Number($page.params.id) }).then((r) => {
				routine = r;
			});
		}
	});
	function handleNextSet() {
		if (!routine) return;
		if (currentIndex < routine?.workout_sets.length - 1) {
			currentIndex++;
		}
	}
</script>

<button class="button primary" onclick={handleNextSet}>click</button>
{#if routine}
	<SetStepper {routine} {currentIndex} />
{/if}
<TimerWatch
	timer={{ seconds: 10 }}
	seconds={10}
	timePassed={0}
	onFinished={() => console.log('finished')}
/>

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
