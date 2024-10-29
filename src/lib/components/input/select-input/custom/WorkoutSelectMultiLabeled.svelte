<script lang="ts">
	import { onMount } from 'svelte';
	import { sleep } from '../../../../helpers/sleep';
	import SelectInputMulti from '../base/SelectInputMulti.svelte';
	import type { Option } from '../../../../../types/form/option';
	import InputGroupGrid from '../../InputGroupGrid.svelte';
	import NewWorkoutModalFormOpenButton from '../../../open-dialog-button/NewWorkoutModalFormOpenButton.svelte';
	import { db_state } from '../../../../store/lofi-db/workout-lofi.svelte';
	let createdWorkout = null;
	let {
		loading,
		name,
		label,
		className
	}: {
		loading?: boolean;
		name?: string;
		label?: string;
		className?: string;
	} = $props();
	let options: Option[] = $state([]);
	const socket = new WebSocket('ws://localhost:1234');

	$effect(() => {
		options = db_state.workouts.map((workout) => {
			return {
				value: workout.id,
				label: workout.exercise_name
			};
		});
		loading = false;
		return () => {
			socket.close();
		};
	});
</script>

<InputGroupGrid {label} {className}>
	{#snippet input()}
		<SelectInputMulti className="fullWidth" {name} {options} {loading}>
			{#snippet endComponent()}
				<NewWorkoutModalFormOpenButton {createdWorkout}>+New</NewWorkoutModalFormOpenButton>
			{/snippet}
		</SelectInputMulti>
	{/snippet}
</InputGroupGrid>

<style>
</style>
