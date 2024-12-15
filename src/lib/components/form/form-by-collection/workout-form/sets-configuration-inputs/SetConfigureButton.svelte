<script lang="ts">
	import DialogGeneric from '$components/dialog/global/DialogGeneric.svelte';
	import { sleep } from '$lib/helpers/sleep';
	import { getForm } from '$lib/store/form-store.svelte';
	import type { Exercise } from '$types/db/exercise';
	import { getContext, onMount } from 'svelte';
	import WorkoutSetConfigSection from './WorkoutSetConfigSection.svelte';
	import SetConfigureModal from './SetConfigureModal.svelte';

	let isOpen = $state(false);
	let selected_exercises: Exercise[] = $state([]);
	let formEl: HTMLFormElement | undefined = $state();
	const form_id: string = getContext('form_id') || 'NULL_ID';

	const inputEvent = new Event('input');

	function dispatchInputEvent() {
		formEl?.dispatchEvent(inputEvent);
	}

	async function handleSetSelectedWorkouts(_?: any) {
		await sleep(10);
		selected_exercises = getForm(form_id)?.exercises || [];
	}

	onMount(() => {
		formEl = document.getElementById(form_id) as HTMLFormElement;
		formEl?.addEventListener('input', handleSetSelectedWorkouts);
	});

	async function openConfig() {
		await handleSetSelectedWorkouts();
		isOpen = true;
	}
</script>

<div class="full-width flex-row">
	<button onclick={openConfig} type="button" class="button primary">configure sets</button>
</div>

<SetConfigureModal
	{isOpen}
	{selected_exercises}
	{formEl}
	{form_id}
	{inputEvent}
	{dispatchInputEvent}
	{handleSetSelectedWorkouts}
/>

<style>
	button {
		margin-left: auto;
	}
</style>
