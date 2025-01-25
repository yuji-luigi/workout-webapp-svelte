<script lang="ts">
	import { closeDialog } from '../../store/global-dialog-store.svelte';

	type ActionProps = {
		text: string;
		action: () => void;
	};

	export let cancelProps: ActionProps | undefined;
	export let confirmProps: ActionProps | undefined;
	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			closeDialog();
			return;
		}
		if (event.key === 'Enter') {
			confirmProps?.action();
		}
	};
</script>

<div class="dialog-actions">
	{#if cancelProps}
		<button type="button" on:keydown={handleKeyDown} on:click={cancelProps.action}
			>{cancelProps.text}</button
		>
	{/if}
	{#if confirmProps}
		<button type="button" on:keydown={handleKeyDown} on:click={confirmProps.action}
			>{confirmProps.text}</button
		>
	{/if}
</div>
