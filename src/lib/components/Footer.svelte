<script>
	import { page } from '$app/stores';
</script>

<footer>
	<nav>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Contact us</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				The company name srl
			</li>
		</ul>
	</nav>
</footer>

<style>
	footer {
		visibility: hidden;
		position: fixed;
		padding-inline: var(--padding-inline-main);
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 1000;
		display: grid;
		justify-content: space-between;
		background: var(--fg-color-dark);
		&::before {
			visibility: hidden;
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

	ul {
		height: var(--sub-header-height);
		display: flex;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	nav a,
	li {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--text-color-primary-white);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}
</style>
