<script>
	import '../style/app.css';
	import '../style/component.css';
	import '../style/utility.css';
	import Dialog from '../lib/components/dialog/Dialog.svelte';
	import VideoHero from '../lib/components/hero/video-hero/VideoHero.svelte';
	import SubHeader from '../lib/components/SubHeader.svelte';
	import Footer from '../lib/components/Footer.svelte';
</script>

<div class="app">
	<SubHeader />
	<main>
		<slot />
	</main>

	<Footer />
</div>
<Dialog />

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	main {
		width: 100%;
		padding-bottom: var(--sub-header-height);
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
