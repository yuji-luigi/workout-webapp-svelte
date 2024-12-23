<script lang="ts">
	import type { ExerciseJoined } from '$types/db/exercise';
	import { fade, scale } from 'svelte/transition';
	import ExerciseConfigCard from '../../../../../../routes/workout/ExerciseConfigCard.svelte';
	import type { WSetJoined } from '../../../../../../types/db/workout-set';
	import { isValidJSON } from '../../../../../helpers/isValidJSON';
	import SelectInputSingle from '../../../../input/select-input/base/SelectInputSingle.svelte';
	import TimerInput from '../../../../input/TimerInput.svelte';
	import AddExercise from './AddExercise.svelte';
	import TimerInputWithDialog from './TimerInputWithDialog.svelte';
	import SetNumberInput from './SetNumberInput.svelte';
	import SetTimeInput from './SetTimeInput.svelte';
	import TimerInputDialog from './TimerInputDialog.svelte';
	import Button from '../../../../button/Button.svelte';
	import IconButton from '../../../../button/IconButton.svelte';
	let {
		wSet,
		index,
		form_id
	}: {
		wSet: WSetJoined;
		index: number;
		form_id: string;
	} = $props();
	let exercises = $state<any>([]);
	function addExercise(exercise: ExerciseJoined) {
		// 1. open dialog
		// dialog has list of exercises.
		// 2. user selects exercise
		// 3. exercise is added to exercises array of this component wSet.exercises
		exercises.push(exercise);
		// how to add exercise to wSet.exercises from modal that is somewhere in parent?
		// is it possible to use Promise to get the selected exercise from modal?
	}
	function removeExercise(index: number) {
		exercises.splice(index, 1);
	}
	let selectedType = $state(wSet.type ? JSON.stringify(wSet.type) : '');
	let _selectedType = $derived.by(() => {
		if (selectedType && isValidJSON(selectedType)) {
			return JSON.parse(selectedType) as WSetType;
		}
		return null;
	});
	const preName = `wSets[${index}]`;
</script>

<div in:scale={{ duration: 300, start: 0.8 }}>
	<div class="grid set-card">
		<div in:fade={{ duration: 300, delay: 150 }}>
			<div class="set-config-header">
				<div class="flex-row">
					<h2>SET#{index + 1}</h2>
					<button>🚮</button>
				</div>
				<div class="flex-column">
					<SelectInputSingle
						bind:selectedOption={selectedType}
						width="auto"
						label="set type"
						collection="workout_set_type"
						name={preName + '.workout_set_type'}
						placeholder="type of set"
						required
						textAlign="center"
					/>
					<SetNumberInput name={preName + '.n_set'} />
				</div>
				<div class="set-level-timers full-width">
					{#if !_selectedType?.has_timer_per_exercise}
						{#if _selectedType?.use_rest_time}
							<TimerInputWithDialog name={preName + '.timer_seconds_rest'} />
							<!-- <SetTimeInput {index} {form_id} name={preName + '.timer_seconds_rest'} />
              rest time -->
						{/if}
						{#if _selectedType?.use_active_time}
							<TimerInputWithDialog name={preName + '.timer_seconds_active'} />
							<!-- 
              <SetTimeInput name={preName + '.timer_seconds_active'} />
              workout time -->
						{/if}
					{/if}
				</div>
			</div>

			{#each exercises as exercise, index}
				<ExerciseConfigCard
					{removeExercise}
					{exercise}
					{index}
					{form_id}
					preName={preName + '.exercises' + `[${index}]`}
					{_selectedType}
				/>
			{/each}
			<AddExercise onclick={addExercise} />
		</div>
	</div>
</div>

<style>
	.set-card {
		display: grid;
		background-color: var(--color-primary-800);
		padding-inline: var(--padding-inline-md);
		/* grid-template-columns: 1fr auto; */
		gap: var(--spacing-lg);
		border: var(--color-primary-600) solid 1.5px;
		padding-block: var(--padding-block-md);
		border-radius: var(--border-radius-lg);
		min-width: 350px;
		@media (max-width: 768px) {
			grid-template-columns: 1fr;
			gap: var(--spacing-sm);
		}
		& > div {
			display: grid;
			gap: var(--spacing-md);
		}
	}

	.set-level-timers {
		display: grid;
		grid-template-columns: 1fr 1fr;
		place-content: center;
		place-items: center;
		gap: var(--spacing-xs);
	}
	.set-cards {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}
	/* .exercise-config-sub-grid {
		grid-template-columns: subgrid;
		gap: var(--spacing-sm);
	} */

	.set-config-header {
		align-items: start;
		h2 {
			place-self: start;
		}
		display: grid;
		grid-template-columns: 1fr auto;
		column-gap: var(--spacing-md);
	}
	.input-section {
		display: grid;
		padding-inline: var(--padding-inline-lg);
		border-radius: var(--border-radius-lg);
		grid-template-columns: 1fr auto auto;
		padding-block: 2rem;
		gap: var(--spacing-sm);
		background-color: var(--gray-700);

		&[draggable='true'] {
			cursor: grab;
		}
	}
</style>
