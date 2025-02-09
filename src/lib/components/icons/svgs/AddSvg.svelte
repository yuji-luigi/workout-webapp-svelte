<script lang="ts">
	let {
		size = 24,
		stroke = 'var(--text-color)',
		fill = 'none'
	}: { size?: number; stroke?: string; fill?: string } = $props();
</script>

<svg
	width={`${size}px`}
	height={`${size}px`}
	viewBox="0 0 24 24"
	xmlns="http://www.w3.org/2000/svg"
>
	<g id="Complete">
		<g data-name="add" id="add-2">
			<g>
				<line
					{fill}
					{stroke}
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					x1="12"
					x2="12"
					y1="19"
					y2="5"
				/>

				<line
					fill="none"
					{stroke}
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					x1="5"
					x2="19"
					y1="12"
					y2="12"
				/>
			</g>
		</g>
	</g>
</svg>
