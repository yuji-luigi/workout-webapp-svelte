<script>
	import '../style/timer.css';
	import '../style/app.css';
	import '../style/component.css';
	import '../style/utility.css';
	import '../style/animation.css';
	import DialogGlobalSingleton from '../lib/components/dialog/global/DialogGlobalSingleton.svelte';
	import VideoHero from '../lib/components/hero/video-hero/VideoHero.svelte';
	import SubHeader from '../lib/components/sub-header/SubHeader.svelte';
	import Footer from '../lib/components/Footer.svelte';
	import VerticalMenu from '../lib/components/vertical-menu/VerticalMenu.svelte';
	import { onDestroy } from 'svelte';
	const socket = new WebSocket('ws://localhost:1234');
	onDestroy(() => {
		socket.close();
	});
</script>

<div class="app">
	<SubHeader />
	<VerticalMenu />
	<main>
		<slot />
	</main>

	<Footer />
</div>
<DialogGlobalSingleton />

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
