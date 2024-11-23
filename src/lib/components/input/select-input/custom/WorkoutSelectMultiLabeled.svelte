<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { sleep } from '../../../../helpers/sleep';
	import SelectInputMulti from '../base/SelectInputMulti.svelte';
	import type { Option } from '../../../../../types/form/option';
	import InputGroupGrid from '../../InputGroupGrid.svelte';
	import NewWorkoutModalFormOpenButton from '../../../open-dialog-button/NewWorkoutModalFormOpenButton.svelte';
	import { db_state } from '../../../../store/lofi-db/workout-lofi.svelte';
	import WorkoutConfigureButton from '../../../form/routine-form/worout-configuration-inputs/WorkoutConfigureButton.svelte';
	import { getForm } from '../../../../store/form-store.svelte';
	import { get } from 'svelte/store';
	let createdWorkout = null;
	let {
		loading,
		name = 'workouts',
		label,
		className
		// form_id
	}: {
		loading?: boolean;
		name?: string;
		label?: string;
		className?: string;
		// form_id: string;
	} = $props();
	let options: Option[] = $state([]);
	const socket = new WebSocket('ws://localhost:1234');
	const form_id = getContext('form_id') as string;
	let form = $state(getForm(form_id));
	$effect(() => {
		options = db_state.workouts.map((workout) => {
			return {
				// value: workout.id,
				id: workout.id,
				value: JSON.stringify(workout),
				label: workout.exercise_name
			};
		});
		loading = false;
		return () => {
			socket.close();
		};
	});
	$effect(() => {
		form = getForm(form_id);
	});
</script>

<InputGroupGrid {label} {className}>
	{#snippet input()}
		<SelectInputMulti className="fullWidth" {name} {options} {loading}>
			{#snippet endComponent()}
				<NewWorkoutModalFormOpenButton {createdWorkout}>+New</NewWorkoutModalFormOpenButton>
			{/snippet}
		</SelectInputMulti>
		<WorkoutConfigureButton {form_id} />
	{/snippet}
</InputGroupGrid>

<style>
</style>
