<script>
	import { page } from '$app/stores';
	import GithubSvg from '../icons/svgs/GithubSvg.svelte';
	import MainNav from '../nav/MainNav.svelte';
	import ThemeSwitch from '../theme-switch/ThemeSwitch.svelte';
	import HamburgerMenu from './HamburgerMenu.svelte';
	import LeftDrawerButton from './LeftDrawerButton.svelte';
</script>

<header>
	<LeftDrawerButton />
	<div class="main-nav-wrapper">
		<MainNav />
	</div>

	<div class="flex-row icons-white">
		<div class="corner">
			<ThemeSwitch />
		</div>
		<div class="corner">
			<a target="_blank" href="https://github.com/yuji-luigi">
				<GithubSvg color="var(--text-color-white)" />
			</a>
		</div>
		<div class="corner">
			<HamburgerMenu color="var(--text-color-white)" />
		</div>
	</div>
</header>

<style>
	header {
		height: var(--sub-header-height);
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1000;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		justify-content: space-between;
		align-items: center;
		padding-inline: var(--padding-inline-header);
		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: var(--fg-color-dark);
			opacity: 0.75;
			z-index: -1;
		}
	}

	.main-nav-wrapper {
		grid-column: 2; /* Place the nav in the center */
	}

	@media (max-width: 768px) {
		.main-nav-wrapper {
			display: none;
		}
	}

	.flex-row {
		grid-column: 3; /* Place the nav in the center */
		place-self: end;
	}
	.flex-row.icons-white {
		gap: 1rem;
		margin-left: 1rem;
	}
	.corner {
		display: flex;
		justify-content: center;
		align-items: center;
		width: var(--sub-header-height);
		height: var(--sub-header-height);
	}

	.corner a {
		display: flex;
		grid-column: 2; /* Place the nav in the center */
		justify-content: center;
		flex-grow: 1; /* Make the nav take up available space */
		position: relative;
		/* --background: rgba(255, 255, 255, 0.7); */
		/* --background: var(--fg-color-dark); */
	}

	a:hover {
		color: var(--text-color-black);
	}
</style>
