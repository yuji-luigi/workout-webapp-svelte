<button class="card" onkeydown={(e) => null} {onclick}>
	<h4 class="title">+</h4>
	<div class="info"></div>
	<div class="description">Add new exercise</div>
	<!-- <button on:click={handleOpenDialog} class="read-more">Read more</button> -->
</button>

<style>
	/* TODO: RENAME CARD TO SOMETHING ELSE */
	.card {
		border-radius: unset;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		cursor: pointer;
		gap: 0.75rem;
		position: relative;
		background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.5)),
			var(--image-url, url('https://picsum.photos/410/300'));
		/* url('https://picsum.photos/410/300'); */
		background-size: cover; /* Ensure the image covers the card */
		background-position: center;
	}

	.info {
		margin: auto;
	}

	.title {
		font-size: 9rem;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.description {
		margin-top: auto;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box; /* Add this */
		-webkit-line-clamp: 3; /* Add this */
		line-clamp: 3;
		-webkit-box-orient: vertical; /* Add this */
	}
</style>
