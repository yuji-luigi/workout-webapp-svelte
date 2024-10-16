<script lang="ts">
	export let id: string | undefined = undefined;
	export let color: string | undefined = '#1F2328';
	export let width: string | undefined = 'var(--sub-header-height)';
</script>

<svg
	{id}
	class="icon-svg hamburger-svg"
	{width}
	height={width}
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path d="M5 6.5H19V8H5V6.5Z" fill={color} />
	<path d="M5 16.5H19V18H5V16.5Z" fill={color} />
	<path d="M5 11.5H19V13H5V11.5Z" fill={color} />
</svg>
