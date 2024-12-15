<script lang="ts">
	import { getContext } from 'svelte';
	import SetConfigureModal from './SetConfigureModal.svelte';

	let isOpen = $state(false);
	// let selected_exercises: Exercise[] = $state([]);
	// let formEl: HTMLFormElement | undefined = $state();

	// const inputEvent = new Event('input');

	// function dispatchInputEvent() {
	// 	formEl?.dispatchEvent(inputEvent);
	// }

	// async function handleSetSelectedWorkouts(_?: any) {
	// 	await sleep(10);
	// 	selected_exercises = getForm(form_id)?.exercises || [];
	// }

	// onMount(() => {
	// 	formEl = document.getElementById(form_id) as HTMLFormElement;
	// 	formEl?.addEventListener('input', handleSetSelectedWorkouts);
	// });

	async function openConfig() {
		// await handleSetSelectedWorkouts();
		isOpen = true;
	}
</script>

<div class="full-width flex-row">
	<button onclick={openConfig} type="button" class="button primary">configure sets</button>
</div>

<SetConfigureModal bind:isOpen />

<style>
	button {
		margin-left: auto;
	}
</style>
