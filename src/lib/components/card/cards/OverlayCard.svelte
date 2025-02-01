<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { RoutineJoined } from '../../../../types/db/routine';

	let {
		children,
		active = false
	}: {
		children?: Snippet;
		active?: boolean;
	} = $props();
	// export let index: numProident proident Lorem deserunt fugiat ad laboris.Quis sit incididunt labore eu amet enim cupidatat adipisicing aute ex reprehenderit officia magna.lse;
	let cardEl: HTMLDivElement;
	// TODO: Can be calculated in a server
	// TODO: refactor unnecessary codes
	// When the component mounts, ensure the card position is available
</script>

<div
	bind:this={cardEl}
	data-active={active}
	role="button"
	tabindex="-1"
	class="card"
	onkeydown={(e) => null}
>
	{@render children?.()}
</div>

<style>
	/* TODO: RENAME CARD TO SOMETHING ELSE */
	div {
		height: 100%;
		border-radius: unset;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		gap: 0.75rem;
		background-image: linear-gradient(
				transparent,
				light-dark(rgba(255, 255, 255, 0.8), rgba(0, 0, 0, 0.5))
			),
			var(--image-url, 'https://picsum.photos/410/300');
		background-size: cover; /* Ensure the image covers the card */
		background-position: center;
		transition: height 1.5s;
	}
</style>
