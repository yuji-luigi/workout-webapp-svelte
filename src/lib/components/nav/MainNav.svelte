<script>
	import { page } from '$app/stores';
	import { mainNavList } from '$lib/data/nav-data';
</script>

<nav>
	<ul>
		{#each mainNavList as { label, href }}
			<li aria-current={$page.url.pathname === href ? 'page' : undefined}>
				<a {href}>{label}</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		display: flex;
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
		@media (max-width: 768px) {
			flex-direction: column;
		}
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
</style>
