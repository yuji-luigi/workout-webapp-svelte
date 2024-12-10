<script lang="ts">
	import { onMount, onDestroy, type Snippet } from 'svelte';

	let {
		element,
		children,
		position
	}: {
		children: Snippet;
		element: HTMLElement;
		position: { top: string; left: string; width: string };
	} = $props();

	let portalElement: HTMLDivElement;
	function calculatePosition() {
		if (element && portalElement) {
			const rect = element.getBoundingClientRect();
			position = {
				top: `${rect.bottom + window.scrollY}px`,
				left: `${rect.left + window.scrollX}px`,
				width: `${rect.width}px`
			};
		}
	}

	onMount(() => {
		portalElement = document.createElement('div');
		document.body.appendChild(portalElement);
		calculatePosition();
		window.addEventListener('resize', calculatePosition);
		window.addEventListener('scroll', calculatePosition);
	});

	onDestroy(() => {
		if (portalElement && portalElement.parentNode) {
			portalElement.parentNode.removeChild(portalElement);
		}
		window.removeEventListener('resize', calculatePosition);
		window.removeEventListener('scroll', calculatePosition);
	});
</script>

<div bind:this={portalElement}>
	<div
		style="position: absolute; top: {position.top}; left: {position.left}; width: {position.width}; z-index: 1000;"
	>
		{@render children()}
	</div>
</div>
