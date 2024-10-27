<div class="container">
	<slot />
</div>

<style>
	.container {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
	}
</style>
