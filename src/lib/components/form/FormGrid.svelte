<script lang="ts">
	import { handle_array_form_data } from '../../helpers/handle-array-form-data';
	import { sleep } from '../../helpers/sleep';
	import InputGrid from '../input/InputGrid.svelte';
	import NewWorkoutModalFormOpenButton from '../open-dialog-button/NewWorkoutModalFormOpenButton.svelte';
	import SelectInput from '../select-input/SelectInputMulti.svelte';
	import WorkoutSelectMulti from '../select-input/WorkoutSelectMulti.svelte';
	let loading = false;
	function handleArrayFormData(form_data: FormData) {}
	async function handleSubmit(event: SubmitEvent) {
		loading = true;
		const form_data = new FormData(event.target as HTMLFormElement);
		const dto = handle_array_form_data(form_data);
		console.log(dto);
		await sleep(2000);
		loading = false;
	}
</script>

<fieldset disabled={loading} aria-busy={loading}>
	<form on:submit={handleSubmit}>
		<InputGrid label="TEST" name="name1" />
		<InputGrid label="TEST2" name="name2" />
		<InputGrid label="TEST3" name="name3" />
		<div class="fullWidth flex-column button-div">
			<button class="button primary" type="submit">Submit</button>
		</div>
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
	.fullWidth {
		grid-column: 1/-1;
	}

	.button {
		width: unset;
		margin-left: auto;
	}
</style>
