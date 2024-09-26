<script>
	import Circle from './Circle.svelte';

	const maxSeconds = 80;
	const currentSeconds = 50;
	const percent = currentSeconds / maxSeconds;
	const r = 80;
	const circumference = 2 * Math.PI * r;
</script>

<div class="skill">
	<div class="outer">
		<div class="inner"></div>
	</div>
	<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
		<defs>
			<linearGradient id="GradientColor">
				<stop offset="0%" stop-color="#ff0000" />
				<stop offset="100%" stop-color="#ffcc00" />
			</linearGradient>
		</defs>
		<Circle />
	</svg>
</div>

<style>
	:root {
		--size: 160px;
		--padding-outer: 20px;
		--size-inner: calc(var(--size) - var(--padding-outer) * 2);
		--stroke-dashoffset: 450;
	}
	/* section {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
		height: 500px;
		width: 500px;
	} */
	.skill {
		width: var(--size);
		height: var(--size);
		position: relative;
		background-color: white;
	}
	.outer {
		height: var(--size);
		width: var(--size);
		border-radius: 50%;
		padding: var(--padding-outer);
		box-shadow:
			6px 6px 10px -1px rgba(0, 0, 0, 0.15),
			-6px -6px 10px -1px rgba(255, 255, 255, 0.7);
	}
	.inner {
		height: var(--size-inner);
		width: var(--size-inner);
		border-radius: 50%;
		border: 1px solid orangered;
		box-shadow:
			inset 4px 4px 6px -1px rgba(0, 0, 0, 0.2),
			inset -4px -4px 6px -1px rgba(255, 255, 255, 0.7),
			inset -0.5px -0.5px 6px -1px rgba(255, 255, 255, 0.7);
	}
	svg {
		transform: rotate(-90deg); /* Rotate the SVG */
		transform-origin: center;
		width: var(--size);
		height: var(--size);
		position: absolute;
		top: 0;
		left: 0;
	}

	#number {
		font-weight: 600;
		color: #555;
	}

	circle {
		--r: calc(var(--size) / 2);
		--max-circumference: calc(var(--r) * 2 *);
		cx: calc(var(--size) / 2);
		cy: calc(var(--size) / 2);
		/* cy: 100px; */
		/* r: calc((var(--size) / 2) + 10px); */
		r: 50px;
		fill: none;
		stroke: url(#GradientColor);
		stroke-width: 10px;
		stroke-dasharray: 450;
		stroke-dashoffset: 140;
		/* 450 - 450 * percent */

		animation: anim linear 2s forwards;
	}
	/* @keyframes anim {
		100% {
			stroke-dashoffset: 157.5;
		}
	} */
</style>
