<script lang="ts">
	import type { ExerciseJoined } from '$types/db/exercise';
	import { fade, scale } from 'svelte/transition';
	import SetTimeInputGroup from '../../lib/components/form/form-by-collection/workout-form/workout-set-configure-modal/inputs/SetTimeInputGroup.svelte';
	import { getForm, getFormIDContext } from '../../lib/store/form/form-store.svelte';
	let {
		exercise,
		index,
		selectedType = $bindable(),
		preName,
		removeExercise
	}: {
		exercise: ExerciseJoined;
		index: number;
		preName: string;
		selectedType: string | null;
		removeExercise: (index: number) => void;
	} = $props();
	let parsedSelectedType: RoutineBlockTypeI = $derived(
		selectedType ? JSON.parse(selectedType) : null
	);
	const form_id = getFormIDContext();
	const formState = $state(getForm(form_id));
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
			{#if parsedSelectedType?.use_exercise_timer}
				{#if parsedSelectedType?.use_active_time}
					<SetTimeInputGroup
						label="workout time"
						{index}
						{form_id}
						name={preName + `.interval.active_time`}
					/>
				{/if}
				{#if parsedSelectedType.use_rest_time}
					<SetTimeInputGroup
						label="rest time"
						{index}
						{form_id}
						name={preName + `.interval.rest_time`}
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
