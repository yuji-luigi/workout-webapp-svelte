<script>
	import HeroTextBlock from '../../lib/components/hero/video-hero/HeroTextBlock.svelte';
	import VideoHero from '../../lib/components/hero/video-hero/VideoHero.svelte';
	import HomeMainSection from './HomeMainSection.svelte';
	import HomeWhyThisAppSection from './HomeWhyThisAppSection.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<VideoHero videoSrc="/videos/cover/running.mp4">
	<slot slot="top-right">
		<HeroTextBlock>
			<div>
				<h2 class="title">Welcome to our fitness community</h2>
				<p>
					Join a community of like-minded individuals. Inspire and motivate each other to reach new
					heights in your fitness journey.
				</p>
			</div>
		</HeroTextBlock>
	</slot>

	<slot slot="bottom-left">
		<h2 class="title">Train with us</h2>

		<p>
			Join a community of like-minded individuals. Inspire and motivate each other to reach new
			heights in your fitness journey.
		</p>
	</slot>
</VideoHero>

<div class="container">
	<HomeMainSection />
</div>
<HomeWhyThisAppSection />

<style>
	h2.title {
		margin-bottom: 0.4rem;
	}
</style>
