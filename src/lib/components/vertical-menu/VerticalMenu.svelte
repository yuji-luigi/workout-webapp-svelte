<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import {
		closeVerticalMenu,
		openVerticalMenu,
		verticalMenuStore,
		type DrawerStore
	} from '../../store/vertical-menu-store';
	import GradientButton from '../gradient-buttons/GradientButton.svelte';
	import ConicButton from '../gradient-buttons/ConicButton.svelte';
	import ConicDiv from '../gradient-buttons/ConicDiv.svelte';
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
	const navlist = [
		{
			label: 'Create Routine',
			href: '/manage/routine'
		},
		{
			label: 'Create Workout',
			href: '/manage/workout'
		},
		{
			label: 'Create Exercise',
			href: '/manage/exercise'
		}
	];
	$: {
		verticalMenuParams = $verticalMenuStore;
	}
</script>

<div id="mySidenav" class="sidenav gcss_sidenav_hover" data-open={verticalMenuParams.isOpen}>
	<button class="closebtn" on:click={closeVerticalMenu}>&times;</button>
	{#each navlist as { label, href }}
		<ConicDiv>
			<a class="relative_text gcss_sidenav_hover_item" on:click={closeVerticalMenu} {href}
				>{label}</a
			>
		</ConicDiv>
	{/each}
</div>
<div
	bind:this={verticalMenuOverlayElement}
	data-open={verticalMenuParams.isOpen}
	class="overlay vertical-menu-overlay"
></div>

<style>
	.sidenav {
		display: grid;
		justify-content: start;
		align-content: start;
		padding: 1rem 3rem;
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
		--ani-width: 100%;
		--linea-g: linear-gradient(
			90deg,
			rgba(2, 0, 36, 1) 0%,
			rgba(0, 212, 255, 1) 1%,
			rgba(0, 212, 255, 1) 99%,
			rgba(2, 0, 36, 1) 100%
		);
		text-decoration: none;
		font-size: 25px;
		color: var(--text-color-white);
		display: block;
		position: relative;
		padding-block: 0.5rem;
		overflow: hidden;
	}
	.gcss_sidenav_hover_item:hover {
		transform: unset;
	}
	.relative_text {
		position: relative;
	}

	@keyframes slideLeft {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(100%);
		}
	}

	.sidenav .closebtn {
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
	/* 
	.sidenav a:hover {
		color: #f1f1f1;
	} */

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
		.sidenav {
			padding-top: 15px;
		}
		.sidenav a {
			font-size: 18px;
		}
	}
</style>
