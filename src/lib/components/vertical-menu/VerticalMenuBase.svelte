<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { leftDrawerState } from '../../store/left_drawer_state.svelte';

	let {
		children,
		position,
		withCloseButton = false,
		className = ''
	}: {
		children: Snippet;
		position: 'left' | 'right';
		withCloseButton?: boolean;
		className?: string;
	} = $props();

	const drawerState = leftDrawerState;
	let verticalMenuOverlayElement: HTMLDivElement;
	function closeVerticalMenu() {
		drawerState.isOpen = false;
	}
	onMount(() => {
		verticalMenuOverlayElement.addEventListener('click', closeVerticalMenu);
	});
</script>

<div class={`drawer-side-nav ${className}`} data-open={drawerState.isOpen} data-position={position}>
	{#if withCloseButton}
		<button class="closebtn" onclick={closeVerticalMenu}>&times;</button>
	{/if}
	{@render children()}
</div>
<!-- Just an overlay to listen for clicks and also show the darker background -->
<div
	bind:this={verticalMenuOverlayElement}
	data-open={drawerState.isOpen}
	class="overlay vertical-menu-overlay"
></div>

<style>
	.drawer-side-nav {
		/* display: grid;
		justify-content: var(--justify-content);
		align-content: var(--align-content); */
		padding: 1rem 2rem;
		height: calc(100% - var(--sub-header-height));
		width: var(--vertical-menu-width);
		transform: translate(100%);
		position: fixed;
		z-index: 1;
		left: 0;
		bottom: 0;
		background-color: #111;
		overflow-x: hidden;
		transition: 0.5s;
		transition: transform 0.5s ease-in-out;
		z-index: 1000;
		color: var(--text-color-white);
		&[data-position='left'] {
			left: 0;
			transform: translate(-100%);
		}
		&[data-position='right'] {
			right: 0;
			transform: translate(100%);
		}
		&[data-open='true'] {
			transform: translate(0);
		}
	}
	.drawer-side-nav a {
		--ani-width: 100%;
		--linea-g: linear-gradient(
			90deg,
			rgba(2, 0, 36, 1) 0%,
			rgba(0, 212, 255, 1) 1%,
			rgba(0, 212, 255, 1) 99%,
			rgba(2, 0, 36, 1) 100%
		);
		text-decoration: none;
		/* font-size: 25px; */
		color: var(--text-color-white);
		display: block;
		position: relative;
		padding-block: 0.5rem;
		overflow: hidden;
	}

	.drawer-side-nav .closebtn {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 100%;
		width: 36px;
		height: 36px;
		position: absolute;
		top: 1rem;
		right: 1rem;
		font-size: 46px;
		margin-left: 50px;
		color: var(--text-color-white);
		transition: 0.3s ease-in-out;
		&:hover {
			background-color: var(--text-color-white);
			color: var(--text-color-black);
		}
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
		position: fixed;
		transition:
			opacity 0.5s ease-in-out,
			visibility 0s; /* Remove the delay for visibility */
	}

	@media screen and (max-height: 450px) {
		.drawer-side-nav {
			padding-top: 15px;
		}
		.drawer-side-nav a {
			font-size: 18px;
		}
	}
</style>
