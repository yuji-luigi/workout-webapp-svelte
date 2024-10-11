<script>
	import {
		closeVerticalMenu,
		openVerticalMenu,
		verticalMenuStore
	} from '../../../store/vertical-menu-store';
	import HamburgerSvg from '../icons/svgs/HamburgerSvg.svelte';
	let isOpen = false;
	function handleOpenMenu() {
		if (isOpen) {
			closeVerticalMenu();
			return;
		}
		openVerticalMenu();
	}
	$: isOpen = $verticalMenuStore.isOpen;
</script>

<button on:click={handleOpenMenu} class="corner">
	<HamburgerSvg />
</button>
