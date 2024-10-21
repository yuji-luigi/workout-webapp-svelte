<script lang="ts">
	import { createFormDataToObject } from '../../helpers/handle-array-form-data';
	import { sleep } from '../../helpers/sleep';
	import InputGrid from '../input/InputGrid.svelte';
	import NewWorkoutModalFormOpenButton from '../open-dialog-button/NewWorkoutModalFormOpenButton.svelte';

	export let loading = false;
	export let handleSubmit: (event: SubmitEvent) => void;
	async function onsubmit(event: SubmitEvent) {
		loading = true;
		handleSubmit(event);
		await sleep(2000);
		loading = false;
	}
</script>

<fieldset disabled={loading} aria-busy={loading}>
	<form on:submit={onsubmit}>
		<slot />
	</form>
</fieldset>

<style>
	fieldset {
		container-type: inline-size;
		border: none;
		border-radius: 5px;
		padding: 1rem;
		transition: opacity 0.3s ease-in-out;
		&[disabled] {
			opacity: 0.5;
		}
	}

	form {
		max-width: var(--max-width);
		display: grid;
		grid-template-columns: repeat(2, auto 1fr);
		gap: 1rem;
	}

	@container (max-width: 600px) {
		form {
			grid-template-columns: 1fr;
			max-width: 400px;
			margin-inline: auto;
		}
	}
</style>
