<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import type { ExerciseJoined } from '../../types/db/exercise';
	import SetTimeInputGroup from '../../lib/components/form/form-by-collection/workout-form/sets-configuration-inputs/SetTimeInputGroup.svelte';
	let {
		exercise,
		index,
		form_id,
		_selectedType,
		preName,
		removeExercise
	}: {
		exercise: ExerciseJoined;
		index: number;
		form_id: string;
		preName: string;
		_selectedType: WSetType | null;
		removeExercise: (index: number) => void;
	} = $props();
</script>

<input hidden type="text" name={preName} value={JSON.stringify(exercise)} />
<div in:scale={{ duration: 400, start: 0.8 }}>
	<div
		in:fade={{
			duration: 400
		}}
		class="set-cards"
	>
		<div class="input-section" draggable="true">
			<h5>{exercise.name}</h5>
			{#if _selectedType?.has_timer_per_exercise}
				{#if _selectedType?.use_active_time}
					<SetTimeInputGroup
						label="workout time"
						{index}
						{form_id}
						name={preName + `timer_seconds_active`}
					/>
				{/if}
				{#if _selectedType}
					<SetTimeInputGroup
						label="rest time"
						{index}
						{form_id}
						name={preName + `.timer_seconds_rest`}
					/>
				{/if}
			{/if} <button onclick={() => removeExercise(index)}>remove</button>
		</div>
	</div>
</div>

<style>
	.set-cards {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}
	/* .exercise-config-sub-grid {
		grid-template-columns: subgrid;
		gap: var(--spacing-sm);
	} */

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
