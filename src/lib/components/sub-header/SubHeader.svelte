<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	import hamburger from '$lib/images/icons/menu-hamburger.svg';
	import HamburgerSvg from '../icons/svgs/HamburgerSvg.svelte';
	import GithubSvg from '../icons/svgs/GithubSvg.svelte';
	import HamburgerMenu from './HamburgerMenu.svelte';
	import ThemeSwitch from '../theme-switch/ThemeSwitch.svelte';
</script>

<header>
	<nav>
		<ul>
			<li aria-current={$page.url.pathname === '/home' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>

			<li aria-current={$page.url.pathname.startsWith('/follow-along') ? 'page' : undefined}>
				<a href="/follow-along">Follow along</a>
			</li>

			<li aria-current={$page.url.pathname.startsWith('/workout') ? 'page' : undefined}>
				<a href="/workout">Workouts</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/timer') ? 'page' : undefined}>
				<a href="/timer">Timers</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/routine') ? 'page' : undefined}>
				<a href="/routine">Routines</a>
			</li>
		</ul>
	</nav>

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
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1000;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		justify-content: space-between;
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

	.corner a,
	nav {
		display: flex;
		grid-column: 2; /* Place the nav in the center */
		justify-content: center;
		flex-grow: 1; /* Make the nav take up available space */
		position: relative;
		/* --background: rgba(255, 255, 255, 0.7); */
		/* --background: var(--fg-color-dark); */
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: var(--sub-header-height);
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--text-color-white);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--text-color-white);
		font-weight: 700;
		font-size: var(--font-size-sm);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--text-color-black);
	}
</style>
