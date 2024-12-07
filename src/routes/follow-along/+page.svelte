<script lang="ts">
	export const prerender = true;

	import Youtube from '../../lib/components/Youtube.svelte';

	let youtubeVideos = [
		{
			id: 1,
			type: 'abs',
			url: 'https://www.youtube.com/embed/Y12vQQ7meYs?si=PkuVx7MqOa497cqs&amp;start=37',
			start: '00:37',
			myDescription: '5 min abs workout that will make your abs sore within a minute'
		},
		{
			id: 2,
			type: 'abs',
			url: 'https://www.youtube.com/embed/OykDjqQqudY?si=NFPJdx8O3P6SSdzs&amp;start=43',
			myDescription: '6 min workout target well from bottom to top of the abs'
		},
		{
			id: 3,
			type: 'abs',
			url: 'https://www.youtube.com/embed/gg33A9qlFh8?si=ei6mLpdMK9PUA2rK&amp;start=180',
			myDescription:
				'6 min workout focused on bottom abs(but feel top of the abs anyway.) Difficult to keep up with Jeff'
		}
	];
</script>

<svelte:head>
	<title>Follow along</title>
	<meta name="description" content="About this app" />
</svelte:head>

<h1>Follow along</h1>
<div class="card-grid">
	{#each youtubeVideos as video}
		<Youtube {video} />
	{/each}
</div>

<style>
	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-auto-rows: 200px;
		gap: 1rem;
		place-items: center;
	}
	h1 {
		margin-bottom: 1rem;
	}
</style>
