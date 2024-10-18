<script>
	import GradientButton from '../../lib/components/gradient-buttons/GradientButton.svelte';
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<section>
	<div class="flex">
		<GradientButton text="Click me" icon="🚀" />

		<button>
			<div class="fancy"></div>
			<span class="text">Download For Free</span>
		</button>
		<div class="button">
			<div class="content">Click Here</div>
			<div class="disco" />
		</div>
	</div>
</section>

<style>
	.flex {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}
</style>
