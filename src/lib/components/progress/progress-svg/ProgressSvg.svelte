<script lang="ts">
	import Circle from './Circle.svelte';
	import CircleNew from './CircleNew.svelte';
	export let seconds: number = 0;
	export let timePassed: number = 0;
</script>

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
	<defs>
		<linearGradient id="GradientColor">
			<stop offset="0%" stop-color="#ff0000" />
			<stop offset="100%" stop-color="#ffcc00" />
		</linearGradient>
	</defs>
	<CircleNew {seconds} {timePassed} />
</svg>

<style>
	svg {
		transform: rotate(-90deg); /* Rotate the SVG */
		transform-origin: center;
		width: var(--size);
		height: var(--size);
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
