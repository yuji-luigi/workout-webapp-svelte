<script>
	import listIconPath from '$lib/assets/icons/list_icon.png';
	import { fade } from 'svelte/transition';
	import ListMenuSvg from '../../../../lib/components/icons/svgs/ListMenuSvg.svelte';
	import { leftDrawerState } from '../../../../lib/store/left_drawer_state.svelte';
	import CloseButton from '../../../../lib/components/button/CloseButton.svelte';
	function handleClick() {
		// leftDrawerState.isOpen = !leftDrawerState.isOpen;
		leftDrawerState.isOpen = !leftDrawerState.isOpen;
	}

	let showListIcon = $state(!leftDrawerState.isOpen);
	let showCloseIcon = $state(leftDrawerState.isOpen);
</script>

<div class="button-container">
	{#if !leftDrawerState.isOpen}
		<div in:fade={{ duration: 300 }} out:fade={{ duration: 300 }} class="button-div">
			<button
				onclick={() => {
					showListIcon = false;
					handleClick();
				}}
			>
				<ListMenuSvg />
			</button>
		</div>
	{/if}
	{#if leftDrawerState.isOpen}
		<div class="button-div" in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
			<CloseButton
				--size={'28px'}
				onclick={() => {
					showCloseIcon = false;
					handleClick();
				}}
			/>
		</div>
	{/if}
	<!-- {#if showListIcon}
		<div
			onoutroend={handleTransitionEnd}
			in:fade={{ duration: 200 }}
			out:fade={{ duration: 200 }}
			class="button-div"
		>
			<button
				onclick={() => {
					showListIcon = false;
					handleClick();
				}}
			>
				<ListMenuSvg />
			</button>
		</div>
	{/if}
	{#if showCloseIcon}
		<div
			class="button-div"
			in:fade={{ duration: 200 }}
			out:fade={{ duration: 200 }}
			onoutroend={handleTransitionEnd}
		>
			<CloseButton
				onclick={() => {
					showCloseIcon = false;
					handleClick();
				}}
			/>
		</div>
	{/if} -->
</div>

<style>
	.button-container {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.button-div {
		position: absolute;

		/* background: none;
		border: none; */
	}
</style>
