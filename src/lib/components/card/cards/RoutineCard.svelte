<script lang="ts">
	import type { RoutineJoined } from '../../../../types/db/routine';

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

<div
	bind:this={cardEl}
	data-active={active}
	data-id={routine.id}
	role="button"
	tabindex="-1"
	class="card selection-card"
	on:keydown={(e) => null}
>
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
</div>

<style>
	/* TODO: RENAME CARD TO SOMETHING ELSE */
	.card {
		border-radius: unset;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		cursor: pointer;
		gap: 0.75rem;
		background-image: linear-gradient(
				transparent,
				light-dark(rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.5))
			),
			var(--image-url, 'https://picsum.photos/410/300');
		background-size: cover; /* Ensure the image covers the card */
		background-position: center;
		transition: height 1.5s;
	}
	.info {
		margin-top: auto;
		position: relative;
	}
	.description {
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}
</style>
