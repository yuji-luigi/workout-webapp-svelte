<script lang="ts">
	import { formatTime } from '$lib/helpers/formatTime';
	let {
		name
	}: {
		index: number;
		form_id: string;
		name: string;
	} = $props();

	let time = $state(1);
	let display = $state('none');
	$effect(() => {
		display = formatTime(time);
	});
</script>

<input value={time} {name} type="number" hidden />
<input value={display} {name} type="text" />

<style>
	input {
		width: 3rem;
		text-align: center;
		border: none;
	}
</style>
