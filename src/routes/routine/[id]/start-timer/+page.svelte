<script lang="ts">
	import { page } from '$app/stores';
	import { db } from '$lib/db/dexie-db/dexie-db';
	import type { RoutineJoined } from '$types/db/routine';
	import { onMount } from 'svelte';
	import SetStepper from './SetStepper.svelte';
	import TimerWatch from '../../../../lib/components/timer/TimerWatch.svelte';
	import TimerWatchNew from '../../../../lib/components/timer/TimerWatchNew.svelte';
	let routine: RoutineJoined | undefined = $state();
	let dialog: HTMLDialogElement;
	let currentSetIndex = $state(0);
	let currentExerciseIndex = $state(0);
	onMount(async () => {
		if ($page.params.id) {
			await db.routine.get({ id: Number($page.params.id) }).then((r) => {
				routine = r;
			});
		}
	});
	function handleNextSet() {
		if (!routine) return;
		if (currentSetIndex < routine?.workout_sets.length - 1) {
			currentSetIndex++;
		}
	}

	function handlePrev() {}
	function handleNext() {}
</script>

{#if routine}
	<div class="flex-column">
		<SetStepper {routine} {currentSetIndex} />
		<div>
			<button onclick={handlePrev} class="button primary">prev</button>
			<button onclick={handleNext} class="button primary">next</button>
		</div>
	</div>
	<TimerWatchNew {routine} />
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
