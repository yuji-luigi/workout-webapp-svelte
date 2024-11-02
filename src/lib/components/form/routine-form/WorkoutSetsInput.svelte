<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import InputGroupGrid from '../../input/InputGroupGrid.svelte';
	import { createFormDataToObject } from '../../../helpers/handle-array-form-data';
	import { db_state } from '../../../store/lofi-db/workout-lofi.svelte';
	import type { RoutineJoined } from '../../../../types/db/routine';
	import type { WorkoutJoined } from '../../../../types/db/workout';
	let {
		className = '',
		name = '',
		type = 'number',
		form_id,
		...other
	}: {
		className?: string;
		name?: string;
		type?: string;
		form_id: string;
	} = $props();
	const { workouts } = db_state;
	let selected_workouts: WorkoutJoined[] = $state([]);
	onMount(() => {
		const form = document.getElementById(form_id) as HTMLFormElement;
		form?.addEventListener('input', (e) => {
			const form_data = new FormData(form);
			const dto = createFormDataToObject(form_data) as any;
			selected_workouts = workouts.filter((workout: WorkoutJoined) =>
				dto.workouts.includes(workout.id)
			);
			console.log(selected_workouts.map((a) => a.exercise_name));
		});
	});
</script>

{#each selected_workouts as workout (workout.id)}
	{workout.exercise_name}
{/each}
