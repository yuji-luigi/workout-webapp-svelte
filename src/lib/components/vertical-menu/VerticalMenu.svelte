<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import {
		closeVerticalMenu,
		openVerticalMenu,
		verticalMenuStore,
		type DrawerStore
	} from '../../store/vertical-menu-store';
	let verticalMenuParams: DrawerStore;
	verticalMenuStore.subscribe((value) => (verticalMenuParams = value));

	let verticalMenuOverlayElement: HTMLDivElement;
	function handleCloseVerticalMenu() {
		if (verticalMenuParams.isOpen) {
			closeVerticalMenu();
		}
	}
	onMount(() => {
		verticalMenuOverlayElement.addEventListener('click', closeVerticalMenu);
	});

	$: {
		verticalMenuParams = $verticalMenuStore;
	}
</script>

<div id="mySidenav" class="sidenav" data-open={verticalMenuParams.isOpen}>
	<button class="closebtn" on:click={closeVerticalMenu}>&times;</button>
	<a
		on:click={closeVerticalMenu}
		href="
  /manage/routine">create routine</a
	>
</div>

<div
	bind:this={verticalMenuOverlayElement}
	data-open={verticalMenuParams.isOpen}
	class="overlay vertical-menu-overlay"
></div>

<style>
	.sidenav {
		height: calc(100% - var(--sub-header-height));
		width: var(--vertical-menu-width);
		transform: translate(100%);
		position: fixed;
		z-index: 1;
		right: 0;
		bottom: 0;
		background-color: #111;
		overflow-x: hidden;
		transition: 0.5s;
		padding-top: 60px;
		transition: transform 0.5s ease-in-out;
		z-index: 1000;
		&[data-open='true'] {
			transform: translate(0);
		}
	}

	.sidenav a {
		padding: 8px 8px 8px 32px;
		text-decoration: none;
		font-size: 25px;
		color: #818181;
		display: block;
		transition: 0.3s;
	}

	.sidenav a:hover {
		color: #f1f1f1;
	}

	.sidenav .closebtn {
		position: absolute;
		top: 0;
		right: 25px;
		font-size: 36px;
		margin-left: 50px;
	}
	.overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1;
		opacity: 0; /* Hidden by default */
		visibility: hidden; /* Make it non-interactive */
		transition:
			opacity 0.5s ease-in-out,
			visibility 0s 0.5s; /* Delay visibility change */
	}

	.overlay[data-open='true'] {
		opacity: 1; /* Make it visible */
		visibility: visible; /* Make it interactive */
		transition:
			opacity 0.5s ease-in-out,
			visibility 0s; /* Remove the delay for visibility */
	}

	@media screen and (max-height: 450px) {
		.sidenav {
			padding-top: 15px;
		}
		.sidenav a {
			font-size: 18px;
		}
	}
</style>
