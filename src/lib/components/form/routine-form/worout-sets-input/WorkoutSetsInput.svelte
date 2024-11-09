<script lang="ts">
	import { onMount } from 'svelte';
	import type { WorkoutJoined } from '../../../../../types/db/workout';
	import { handleArrayFormData } from '../../../../helpers/form-helper/handle-array-form-data';
	import { db_state } from '../../../../store/lofi-db/workout-lofi.svelte';
	import InputGrid from '../../../input/InputGrid.svelte';
	import { sleep } from '../../../../helpers/sleep';
	import { openDialog } from '../../../../store/global-dialog-store';
	import VideoHero from '../../../hero/video-hero/VideoHero.svelte';
	import DialogGlobalSingleton from '../../../dialog/global/DialogGlobalSingleton.svelte';
	import Dialog from '../../../dialog/Dialog.svelte';
	import DialogGeneric from '../../../dialog/global/DialogGeneric.svelte';
	import NumberInput from '../../../time-counter/NumberInput.svelte';
	import TimeCounter from '../../../time-counter/TimeCounter.svelte';
	import WorkoutCounter from './WorkoutCounterInputSection.svelte';
	import CountDialog from '../../../dialog/count-dialog/CountDialog.svelte';
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
	let isOpenCounterModal = $state(false);
	let selected_workouts: WorkoutJoined[] = $state([]);
	let formEl: HTMLFormElement | undefined = $state();

	async function handleSetSelectedWorkouts(_?: Event) {
		await sleep(10); // get the latest form data
		const form_data = new FormData(formEl);
		const dto = handleArrayFormData(form_data) as any;
		const _selected_workouts = workouts.filter((workout: WorkoutJoined) => {
			if (Array.isArray(dto.workouts)) {
				return dto.workouts.includes(workout.id);
			} else {
				return dto.workouts === workout.id;
			}
		});
		selected_workouts = _selected_workouts;
	}
	$effect(() => {
		workouts = db_state.workouts;
	});
	onMount(() => {
		formEl = document.getElementById(form_id) as HTMLFormElement;
		formEl?.addEventListener('input', handleSetSelectedWorkouts);
		// update the selected workouts onSav(dev) also.
		handleSetSelectedWorkouts();
	});
	async function openConfig() {
		await handleSetSelectedWorkouts();
		isOpen = true;
	}
	// $effect(() => {
	// 	// console.log({ isOpen });
	// });
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
<DialogGeneric bind:isOpen>
	<h2 class="title">Sets and rest time</h2>
	<section class="grid">
		{#each selected_workouts as workout, index}
			<WorkoutCounter bind:isOpenCounterModal {workout} {index} />
		{/each}
	</section>
	<CountDialog bind:isOpen={isOpenCounterModal} />
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
		@media (max-width: 768px) {
			grid-template-columns: 1fr;
			gap: var(--spacing-sm);
		}
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
