<script lang="ts">
	import { onMount } from 'svelte';
	import type { WorkoutJoined } from '../../../../types/db/workout';
	import { createFormDataToObject } from '../../../helpers/handle-array-form-data';
	import { db_state } from '../../../store/lofi-db/workout-lofi.svelte';
	import InputGrid from '../../input/InputGrid.svelte';
	import { sleep } from '../../../helpers/sleep';
	import { openDialog } from '../../../store/dialog-store';
	import VideoHero from '../../hero/video-hero/VideoHero.svelte';
	import DialogGlobalSingleton from '../../dialog/global/DialogGlobalSingleton.svelte';
	import Dialog from '../../dialog/Dialog.svelte';
	import DialogGeneric from '../../dialog/global/DialogGeneric.svelte';
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
	let dialog: HTMLDialogElement | undefined = $state();
	let isOpen = $state(false);
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
			dto,
			_selected_workouts,
			workoutDB: workouts
		});
	}
	$effect(() => {
		workouts = db_state.workouts;
	});
	onMount(() => {
		formEl = document.getElementById(form_id) as HTMLFormElement;
		formEl?.addEventListener('input', handleSetSelectedWorkouts);
	});
	function openConfig() {
		console.log({ isOpen });
		isOpen = true;
		console.log('openConfig');
	}
	$effect(() => {
		console.log({ isOpen });
	});
</script>

<div class="full-width flex-row">
	<button onclick={openConfig} type="button" class="button primary">configure sets</button>
</div>

<!-- should include: 
1. n_sets
2. seconds_active
3. seconds_rest 
-->
<!-- <dialog bind:this={dialog}>content</dialog> -->

<DialogGeneric bind:isOpen bind:dialog>
	<h2 class="title">Sets and rest time</h2>
	<section class="grid">
		{#each selected_workouts as workout, index}
			<h2 class="exercise-name">{workout.exercise_name}</h2>
			<div class="input-section">
				<div class="input-group">
					<span> n.sets </span>
					<span> + </span>
					<span> 5 </span>
					<span> - </span>
				</div>
				<div class="input-group">
					<span> n.sets </span>
					<span> + </span>
					<span> 5 </span>
					<span> - </span>
				</div>
				<div class="input-group">
					<span> n.sets </span>
					<span> + </span>
					<span> 5 </span>
					<span> - </span>
				</div>
			</div>
		{/each}
	</section>
</DialogGeneric>

<style>
	button {
		margin-left: auto;
	}
	.title {
		margin-bottom: 1rem;
		text-align: center;
	}
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-lg);
	}
	.input-section {
		display: grid;
		gap: var(--spacing-sm);
	}
	.input-group {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		font-size: var(--font-size-md);
	}
</style>
