<script lang="ts">
	import '../style/timer.css';
	import '../style/variables.css';
	import '../style/app.css';
	import '../style/component.css';
	import '../style/animation.css';
	import '../style/utility.css';
	import '../style/font.css';
	import DialogGlobalSingleton from '../lib/components/dialog/global/DialogGlobalSingleton.svelte';
	import VideoHero from '../lib/components/hero/video-hero/VideoHero.svelte';
	import SubHeader from '../lib/components/sub-header/SubHeader.svelte';
	import Footer from '../lib/components/Footer.svelte';
	import VerticalMenu from '../lib/components/vertical-menu/VerticalMenu.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { createWebsocketStates } from '../lib/store/socket-store.svelte';
	import type { Snippet } from 'svelte';
	// import { workoutsY } from '../lib/store/lofi-db/workout-lofi.svelte';
	import { seedDexieDB } from '../lib/db/lofi-yjs-db/seedDb';
	import { initTables } from '../lib/db/table_states.svelte';

	let { children }: { children: Snippet } = $props();
	const socketStates = createWebsocketStates();
	onMount(async () => {
		socketStates.setGlobalWebSocket(new WebSocket('ws://localhost:1234'));
		socketStates.globalWebSocket?.addEventListener('open', () => {
			// seedLocalDB();
		});
		await seedDexieDB();
		console.log(socketStates.isConnected && 'yjs socket connected!');
		await initTables();
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
		/* removed */
		/* padding-bottom: var(--sub-header-height); */
	}

	@media (min-width: 480px) {
	}
</style>
