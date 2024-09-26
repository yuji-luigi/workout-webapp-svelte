<script>
	const maxSeconds = 80;
	const currentSeconds = 50;
	const percent = currentSeconds / maxSeconds;
	const r = 80;
	const circumference = Math.round(2 * Math.PI * r);
	const processed = Math.round(circumference - circumference * percent);
	console.log({ processed, circumference });
</script>

<circle stroke-linecap="round" style={`--processed:${processed};--max-c:${circumference};`} />

<!-- <circle
	stroke-linecap="round"
	style={`--processed:${processed};--max-c: ${circumference}`}
/> -->

<style>
	:root {
		--size: 160px;
		--r: calc(var(--size) / 2);
		--max-c: calc(var(--r) * 2 * 3.14159265359);
		--processed: 200;
	}
	circle {
		cx: calc(var(--size) / 2);
		cy: calc(var(--size) / 2);
		/* cy: 100px; */
		/* r: calc((var(--size) / 2) + 10px); */
		r: var(--r);
		fill: none;
		stroke: url(#GradientColor);
		stroke-width: 10px;
		stroke-dasharray: var(--max-c);
		stroke-dashoffset: var(--processed, 200);
		/* 450 - 450 * percent */

		animation: anim linear 2s forwards;
	}
</style>
