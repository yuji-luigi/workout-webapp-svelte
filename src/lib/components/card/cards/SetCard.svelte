<script lang="ts">
	import type { RoutineBlockJoined } from '../../../../types/db/routine_block_interface';
	import { formatSecondsToTimer } from '../../../helpers/format-time/formatSecondsToTimer';

	let { set, index }: { set: RoutineBlockJoined; index: number } = $props();
</script>

<section class="set-card">
	<div class="flex-row">
		<h4>Set.{index + 1}:</h4>
		&nbsp;
		<h4>{set.type.name}</h4>
		{#if set.set_rest_time}
			<h5>Rest time: {formatSecondsToTimer(set.set_rest_time)}</h5>
		{/if}
		{#if set.set_active_time}
			<h5>Active time: {formatSecondsToTimer(set.set_active_time)}}</h5>
		{/if}
	</div>
	<div>
		{#each set.exercises as exercise, index}
			<h5>{exercise.name}</h5>
			{#if exercise.rest_time}
				<h5>{formatSecondsToTimer(exercise.rest_time)} rest</h5>
			{/if}
			{#if exercise.active_time}
				<h5>{formatSecondsToTimer(exercise.active_time)} active</h5>
			{/if}
		{/each}
	</div>
</section>

<style>
	.set-card {
	}
</style>
