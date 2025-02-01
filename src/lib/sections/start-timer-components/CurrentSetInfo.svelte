<script lang="ts">
	import { exercise } from '../../data/template-json/dataTable';
	import { getIntervalTimer } from '../../store/timers/interval_timer.svelte';
	import { CurrentRoutineStore, routinesStore } from '../../store/states/routine_store.svelte';
	const currentRoutineStore = new CurrentRoutineStore();
	const intervalTimer = getIntervalTimer();
	const n_set = $derived(routinesStore.currentRoutine?.blocks[intervalTimer.blockIndex]?.n_set);
	intervalTimer.printIntervalPresetsWithExercise();
</script>

<section class="blackboard-section">
	<div class="container blackboard-content">
		<div class="full-width block-list">
			{#each routinesStore.currentRoutine?.blocks || [] as block, index}
				<h3 class="" data-active={intervalTimer.currentFlow.block_index === index}>
					BLOCK#{index + 1}
				</h3>
			{/each}
		</div>

		<div class="full-width center">
			<h3 class="n-set">Set {intervalTimer.currentFlow.set_index + 1}/{n_set}</h3>
			<div class="exercise-list">
				{#each routinesStore.currentRoutine?.blocks[intervalTimer.blockIndex]?.exercises || [] as exercise, index}
					<p data-active={intervalTimer.currentFlow.exercise_index === index}>
						{exercise.name},
					</p>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.blackboard-section {
		min-height: 50vh;
		font-family: 'DkCrayonCrumble';
		font-size: 1.5rem;
		padding: 2rem 3rem;
		color: var(--text-color-white);
		& [data-active='false'] {
			transition: all 0.1s ease-in-out;
			opacity: 0.5;
		}
		& [data-active='true'] {
			transition: all 0.1s ease-in-out;
			opacity: 1;
		}
		/* border-bottom: var(--color-primary) 5px solid; */
	}
	.block-list {
		display: flex;
		flex-direction: row;
		gap: var(--gap-lg);
		justify-content: center;
		& :not([data-active='true']) {
			opacity: 0.5;
		}
	}
	.n-set {
		text-align: right;
	}

	.exercise-list {
		display: flex;
		flex-direction: row;
		gap: var(--gap-sm);

		/* text-align: center; */
	}
	.blackboard-content {
		display: grid;
		place-items: center;
		gap: var(--gap-md);
		grid-template-columns: 1fr 1fr;
	}
</style>
