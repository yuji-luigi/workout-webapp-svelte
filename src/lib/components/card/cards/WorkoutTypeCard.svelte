<script lang="ts">
	import { onMount } from 'svelte';
	import { getTimerTime } from '../../../helpers/formatTimerTime';

	type WorkoutType = {
		name: string;
		description: string;
		image: string;
		id: number;
	};

	export let index: number;
	export let workoutType: WorkoutType;
	export let active = false;
	let cardEl: HTMLDivElement;
	// TODO: Can be calculated in a server
	workoutType;

	// When the component mounts, ensure the card position is available
</script>

<div
	bind:this={cardEl}
	data-active={active}
	role="button"
	tabindex="-1"
	class="card"
	on:keydown={(e) => null}
	data-index={index}
	style={`--image-url:${workoutType.image};`}
>
	<div class="info">
		<h4>{workoutType.name}</h4>
		<p class="description">
			{workoutType.description}
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
		background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.5)),
			var(--image-url, url('https://picsum.photos/410/300'));
		/* url('https://picsum.photos/410/300'); */
		background-size: cover; /* Ensure the image covers the card */
		background-position: center;
		transition: height 1.5s;
		color: var(--text-color-white);
		&[data-active='true'] {
			/* position: fixed;
			top: 50%;
			left: 50%;
			bottom: 50%;
			right: 50%;
			transform: translate(-50%, -50%);
			height: 600px;
			width: 300px;
			z-index: 1; */
		}
	}
	.info {
		margin-top: auto;
		position: relative;
		color: red;
	}
	.description {
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box; /* Add this */
		-webkit-line-clamp: 3; /* Add this */
		-webkit-box-orient: vertical; /* Add this */
	}
</style>
