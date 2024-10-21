<script lang="ts">
	import type { Option } from '../../../../../types/form/option';
	import Tile from './Tile.svelte';
	let gridEl: HTMLDivElement;

	let selectedId: string | number = $state('');

	let { options, name }: { options: Option[]; name: string } = $props();

	function handleSelect(e: MouseEvent) {
		const cardEl = (e.target as HTMLElement)?.closest('.card.reactive-card') as HTMLDivElement;
		if (cardEl) {
			cardEl.dataset.active = 'true';
			selectedId = Number(cardEl.dataset?.id) ?? '';
			gridEl?.querySelectorAll('.card').forEach((card: Element) => {
				if (card !== cardEl && card instanceof HTMLElement) {
					card.dataset.active = 'false';
				}
			});
		}
	}
</script>

<div
	bind:this={gridEl}
	onclick={handleSelect}
	tabindex="0"
	onkeydown={null}
	role="button"
	class="tile-grid-container"
>
	{#each options as data}
		<Tile {data} {name} selected={data.value === selectedId} />
	{/each}
</div>

<style>
	.tile-grid-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		gap: 0.3rem;
	}
</style>
