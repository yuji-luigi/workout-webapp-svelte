<script lang="ts">
	import type { Workout } from '../../../../types/db/workout';
	import { createRandomImage } from '$images/random-images';
	import { dialogStore, openDialog } from '../../../store/global-dialog-store.svelte';

	import WorkoutCardModalContent from './WorkoutCardModalContent.svelte';

	let { workout }: { workout: Workout } = $props();

	const handleOpenDialog = () => {
		openDialog({
			componentInDialog: {
				component: WorkoutCardModalContent as any,
				props: { workout }
			}
		});
	};
</script>

<div
	role="button"
	tabindex="-1"
	class="card"
	onkeydown={(e) => null}
	onclick={handleOpenDialog}
	style={`--image-url:url(${createRandomImage()})`}
>
	<!-- <img alt="workout" src="https://picsum.photos/410/300" /> -->
	<div class="info">
		<h4>{workout.name}</h4>
		<p class="description">
			{workout.description}
		</p>
	</div>
	<!-- <button on:click={handleOpenDialog} class="read-more">Read more</button> -->
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
	.read-more {
		border: none;
		background-color: transparent;
		margin: auto 0 0 auto;
	}
</style>
