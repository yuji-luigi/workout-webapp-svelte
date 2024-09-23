<script lang="ts">
	import { dialogStore, openDialog } from '../../../../store/dialog-store';

	import ExerciseCardModalContent from './ExerciseCardModalContent.svelte';
	type Exercise = {
		name: string;
		description: string;
		image: string;
	};
	export let exercise: Exercise;

	const handleOpenDialog = () => {
		openDialog({
			componentInDialog: {
				component: ExerciseCardModalContent,
				props: { exercise }
			}
		});
	};
</script>

<div role="button" tabindex="-1" class="card" on:keydown={(e) => null} on:click={handleOpenDialog}>
	<!-- <img alt="exercise" src="https://picsum.photos/410/300" /> -->
	<div class="info">
		<h4>{exercise.name}</h4>
		<p class="description">
			{exercise.description}
		</p>
	</div>
	<!-- <button on:click={handleOpenDialog} class="read-more">Read more</button> -->
</div>

<style>
	img {
		width: 100%;
		max-height: 150px;
		object-fit: cover;
	}
	/* TODO: RENAME CARD TO SOMETHING ELSE */
	.card {
		border-radius: unset;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		cursor: pointer;
		gap: 0.75rem;
		background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.5)),
			url('https://picsum.photos/410/300');
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
