<script lang="ts">
	import { onMount } from 'svelte';
	import { sleep } from '../../../../helpers/sleep';
	import SelectInputMulti from '../base/SelectInputMulti.svelte';
	import type { Option } from '../../../../../types/form/option';
	import InputGroupGrid from '../../InputGroupGrid.svelte';
	import NewWorkoutModalFormOpenButton from '../../../open-dialog-button/NewWorkoutModalFormOpenButton.svelte';
	export let loading = true;
	export let name = 'workouts';
	export let label = 'Workouts';
	export let className: string = '';

	let options: Option[] = [];
	onMount(async () => {
		await sleep(1000);
		options = [
			{ value: 1, label: 'Workout 1' },
			{ value: 2, label: 'Workout 2' },
			{ value: 3, label: 'Workout 3' },
			{ value: 4, label: 'Workout 4' },
			{ value: 5, label: 'Workout 5' },
			{ value: 6, label: 'Workout 6' },
			{ value: 7, label: 'Workout 7' }
		];
		loading = false;
	});
</script>

<InputGroupGrid {label} {className}>
	<slot slot="input">
		<SelectInputMulti className="fullWidth" {name} {options} {loading}>
			<slot slot="endComponent">
				<button type="button" class="endComponent_span primary button">
					<NewWorkoutModalFormOpenButton>+New</NewWorkoutModalFormOpenButton>
				</button>
			</slot>
		</SelectInputMulti>
	</slot>
</InputGroupGrid>

<style>
	button {
		margin-left: auto;
	}
	.endComponent_span {
		padding: 0.25rem 0.5rem;
		border-radius: 3rem;
	}
</style>
