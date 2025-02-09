<script lang="ts">
	let {
		size = 24,
		stroke = 'var(--text-color)',
		fill = 'none'
	}: { size: number; stroke: string; fill?: string } = $props();
</script>

<svg
	width={`${size}px`}
	height={`${size}px`}
	viewBox="0 0 24 24"
	{fill}
	xmlns="http://www.w3.org/2000/svg"
>
	<path d="M6 12L18 12" {stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>
