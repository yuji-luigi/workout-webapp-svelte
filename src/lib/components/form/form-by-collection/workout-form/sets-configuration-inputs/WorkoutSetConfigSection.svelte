<script lang="ts">
	import type { Exercise } from '$types/db/exercise';
	import { fade, scale } from 'svelte/transition';
	import SelectInputSingle from '../../../../input/select-input/base/SelectInputSingle.svelte';
	import AddExercise from './AddExercise.svelte';
	import SetNumberInput from './SetNumberInput.svelte';
	import SetTimeInput from './SetTimeInput.svelte';
	let {
		exercise,
		index,
		form_id
	}: {
		exercise: Exercise;
		index: number;
		form_id: string;
	} = $props();
	let exercises = $state<any>([]);
	function addExercise() {
		console.log('add exercise');
		exercises.push({});
	}
	let selectedType = $state('');
	let _selectedType = $state<WorkoutType | null>(null);
	const preName = `exercises[${index}]`;

	$effect(() => {
		if (selectedType) {
			_selectedType = JSON.parse(selectedType);
		}
	});
</script>

<div in:scale={{ duration: 300, start: 0.8 }} class="grid set-card">
	<div in:fade={{ duration: 300, delay: 150 }}>
		<div class="flex-row full-width set-config-header">
			<h2>SET#{index + 1}</h2>
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
		</div>

		{#each exercises as exercise}
			<div in:scale={{ duration: 400, start: 0.8 }}>
				<div
					in:fade={{
						duration: 400
					}}
					class="set-cards"
				>
					<div class="input-section" draggable="true">
						{#if _selectedType?.use_active_time}
							<SetTimeInput
								label="workout time"
								{index}
								{form_id}
								name={preName + '.timer_seconds_active'}
							/>
						{/if}
						{#if _selectedType?.use_rest_time}
							<SetTimeInput
								label="rest time"
								{index}
								{form_id}
								name={preName + '.timer_seconds_rest'}
							/>
						{/if}
					</div>
				</div>
			</div>
		{/each}

		<AddExercise onclick={addExercise} />
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
	.full-width {
		grid-column: 1/-1;
		padding-inline: var(--padding-inline-lg);
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
	.flex-row {
		/* justify-content: space-between; */
		gap: var(--spacing-md);
		align-items: center;
		h2 {
			place-self: start;
		}
	}
	.set-config-header {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--spacing-md);
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
