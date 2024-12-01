<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { sleep } from '../../../../helpers/sleep';
	import SelectInputMulti from '../base/SelectInputMulti.svelte';
	import type { Option } from '../../../../../types/form/option';
	import InputGroupGrid from '../../InputGroupGrid.svelte';
	import NewExerciseModalFormOpenButton from '../../../open-dialog-button/NewExerciseModalFormOpenButton.svelte';
	import { db_state } from '../../../../store/lofi-db/workout-lofi.svelte';
	import ExerciseConfigureButton from '../../../form/workout-form/exercise-configuration-inputs/ExerciseConfigureButton.svelte';
	import { getForm } from '../../../../store/form-store.svelte';
	import { get } from 'svelte/store';
	let createdWorkout = null;
	let {
		loading = true,
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
		options = db_state.exercises.map((exercise) => {
			return {
				// value: exercise.id,
				id: exercise.id,
				value: JSON.stringify(exercise),
				label: exercise.name
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

<InputGroupGrid {label} {className} {name}>
	{#snippet input()}
		<SelectInputMulti className="fullWidth" {name} {options} {loading}>
			{#snippet endComponent()}
				<NewExerciseModalFormOpenButton {createdWorkout}>+New</NewExerciseModalFormOpenButton>
			{/snippet}
		</SelectInputMulti>
	{/snippet}
</InputGroupGrid>

<style>
</style>
