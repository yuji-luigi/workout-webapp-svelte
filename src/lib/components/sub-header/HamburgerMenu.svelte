<script lang="ts">
	import {
		closeVerticalMenu,
		openVerticalMenu,
		verticalMenuStore
	} from '../../store/vertical-menu-store';
	import HamburgerSvg from '../icons/svgs/HamburgerSvg.svelte';
	let isOpen = false;
	export let color: string | undefined = undefined;
	function handleOpenMenu() {
		if (isOpen) {
			closeVerticalMenu();
			return;
		}
		openVerticalMenu();
	}
	$: isOpen = $verticalMenuStore.isOpen;
</script>

<button on:click={handleOpenMenu}>
	<HamburgerSvg id="vertical-menu-open-icon" {color} />
</button>

<style>
	button {
		height: unset;
		/* background: red; */
	}
</style>
