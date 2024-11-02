<script lang="ts">
	import { onMount } from 'svelte';
	import type { WorkoutJoined } from '../../../../types/db/workout';
	import { createFormDataToObject } from '../../../helpers/handle-array-form-data';
	import { db_state } from '../../../store/lofi-db/workout-lofi.svelte';
	import InputGrid from '../../input/InputGrid.svelte';
	import { sleep } from '../../../helpers/sleep';
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
	let { workouts } = db_state;
	let count = $state(0);
	function increment() {
		console.log('increment');
		count += 1;
	}
	let selected_workouts: WorkoutJoined[] = $state([]);
	let formEl: HTMLFormElement | undefined = $state();

	async function handleSetSelectedWorkouts(_: Event) {
		await sleep(10); // get the latest form data
		const form_data = new FormData(formEl);
		const dto = createFormDataToObject(form_data) as any;
		const _selected_workouts = workouts.filter((workout: WorkoutJoined) => {
			if (Array.isArray(dto.workouts)) {
				console.log('isArray');
				return dto.workouts.includes(workout.id);
			} else {
				console.log('!isArray');
				return dto.workouts === workout.id;
			}
		});
		selected_workouts = _selected_workouts;
		console.log({
			dto: dto.workouts,
			_selected_workouts,
			workoutDB: workouts
		});
	}
	$effect(() => {
		workouts = db_state.workouts;
	});
	onMount(() => {
		formEl = document.getElementById(form_id) as HTMLFormElement;
		console.log({ formEl });

		formEl?.addEventListener('input', handleSetSelectedWorkouts);
	});
</script>

<button onclick={increment} type="button">clicked {count}</button>
{#each selected_workouts as workout (workout.id)}
	<InputGrid label={workout.exercise_name} name="sets" type="number" />
{/each}
