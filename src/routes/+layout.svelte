<script lang="ts">
	import '../style/timer.css';
	import '../style/app.css';
	import '../style/component.css';
	import '../style/animation.css';
	import '../style/utility.css';
	import DialogGlobalSingleton from '../lib/components/dialog/global/DialogGlobalSingleton.svelte';
	import VideoHero from '../lib/components/hero/video-hero/VideoHero.svelte';
	import SubHeader from '../lib/components/sub-header/SubHeader.svelte';
	import Footer from '../lib/components/Footer.svelte';
	import VerticalMenu from '../lib/components/vertical-menu/VerticalMenu.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { createWebsocketStates } from '../lib/store/socket-store.svelte';
	import type { Snippet } from 'svelte';
	// import { workoutsY } from '../lib/store/lofi-db/workout-lofi.svelte';
	import { seedLocalDB } from '../lib/db/lofi-yjs-db/seedDb';

	let { children }: { children: Snippet } = $props();
	const socketStates = createWebsocketStates();
	onMount(() => {
		socketStates.setGlobalWebSocket(new WebSocket('ws://localhost:1234'));
		socketStates.globalWebSocket?.addEventListener('open', () => {
			seedLocalDB();
		});
		console.log('state', socketStates.isConnected);
	});
</script>

<div class="app">
	<SubHeader />
	<VerticalMenu />
	<main>
		{@render children()}
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

	@media (min-width: 480px) {
	}
</style>
