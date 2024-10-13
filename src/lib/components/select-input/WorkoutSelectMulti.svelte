<script lang="ts">
	import { onMount } from 'svelte';
	import { sleep } from '../../helpers/sleep';
	import SelectInputMulti from './SelectInputMulti.svelte';
	import type { Option } from '../../../types/form/option';
	export let loading = true;
	export let name = 'workouts';

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

<SelectInputMulti {name} {options} {loading} />
