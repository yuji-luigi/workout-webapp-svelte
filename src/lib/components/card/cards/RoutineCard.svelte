<script lang="ts">
	import type { RoutineJoined } from '../../../../types/db/routine';
	import OverlayCard from './OverlayCard.svelte';

	let {
		index,
		routine,
		active = false
	}: {
		index: number;
		routine: RoutineJoined;
		active: boolean;
	} = $props();
	// export let index: numProident proident Lorem deserunt fugiat ad laboris.Quis sit incididunt labore eu amet enim cupidatat adipisicing aute ex reprehenderit officia magna.lse;
	let cardEl: HTMLDivElement;
	// TODO: Can be calculated in a server
	// TODO: refactor unnecessary codes
	routine;
	// When the component mounts, ensure the card position is available
</script>

<div class="selection-card" data-active={active} data-id={routine.id}>
	<OverlayCard>
		<div class="info">
			<h4>{routine.name}</h4>
			<p>
				{#each routine.blocks as set, index}
					set#{index + 1}{set.name} ({set.type.name})
					{#each set.exercises as exercise, index}
						{exercise.name}
					{/each}
				{/each}
			</p>
		</div>
	</OverlayCard>
</div>

<style>
	/* TODO: RENAME CARD TO SOMETHING ELSE */
	.selection-card {
		padding: 0;
		transition: scale 0.5s;
		overflow: hidden;
		font-weight: 700;
		cursor: pointer;
	}
	.info {
		display: -webkit-box; /* Must use webkit-box */
		text-align: left;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 8; /* Set # of lines to show */
		line-clamp: 8;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
