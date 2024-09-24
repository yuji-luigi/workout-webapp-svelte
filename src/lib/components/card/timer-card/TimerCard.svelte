<script lang="ts">
	import { dialogStore, openDialog } from '../../../../store/dialog-store';

	import ExerciseCardModalContent from './TimverCardModal.svelte';
	type Exercise = {
		name: string;
		description: string;
		image: string;
	};
	export let exercise: Exercise;
	export let active = false;

	const handleOpenTimer = () => {};
</script>

<div
	data-active={active}
	role="button"
	tabindex="-1"
	class="card"
	on:keydown={(e) => null}
	on:click={handleOpenTimer}
	style={`--image-url:${exercise.image}`}
>
	<div class="info">
		<h4>{exercise.name}</h4>
		<p class="description">
			{exercise.description}
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
		transition: all 1.5s;
		&[data-active='true'] {
			position: absolute;
			top: 50%;
			bottom: 50%;
			left: 50%;
			right: 50%;
			transform: translate(-50%, -50%);
			z-index: 1000;
		}
	}
	.info {
		margin-top: auto;
	}
	.description {
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box; /* Add this */
		-webkit-line-clamp: 3; /* Add this */
		-webkit-box-orient: vertical; /* Add this */
	}
</style>
