<script lang="ts">
	import { getMinutesFromSeconds } from '../../helpers/format-time/getMinutes';
	import { getSeconds } from '../../helpers/format-time/getSeconds';
	import { getTenthSeconds } from '../../helpers/format-time/getTenthSeconds';

	import CounterColumn from '../counter/CounterColumn.svelte';
	let {
		time = $bindable(0)
	}: {
		time?: number;
	} = $props();
	const min = 0;
</script>

<section>
	<CounterColumn {min} count={60} bind:value={time} resolver={getMinutesFromSeconds} />

	:
	<CounterColumn {min} count={10} bind:value={time} resolver={getTenthSeconds} />
	<CounterColumn {min} count={1} bind:value={time} resolver={getSeconds} />
</section>

<style>
	section {
		display: flex;
		place-items: center;
		place-content: center;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.25rem;
	}
</style>
