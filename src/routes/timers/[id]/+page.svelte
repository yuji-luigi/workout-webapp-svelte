<script lang="ts">
	import type { Timer } from '../../../types/db/timer';

	export let data: { timer: Timer };
	console.log(data.timer);
</script>

<div class="container">
	{#if data.timer}
		<h1>{data.timer.name}</h1>
		<p>{data.timer.description}</p>
		<p>{data.timer.seconds}</p>
		<img src={data.timer.image.split('(')[1].split(')')[0]} alt="" height="300px" />
	{/if}
	{#if !data.timer}
		<h1 class="not-found-title">404 Timer not found</h1>
	{/if}
</div>

<style>
	.container {
		display: grid;
		place-content: center;
		gap: 1rem;
	}
	.not-found-title {
		text-align: center;
	}
</style>
