<script lang="ts">
	import { closeDialog, dialogStore, type DialogStore } from '../../../store/dialog-store';
	import { sleep } from '../../helpers/sleep';
	let dialog: HTMLDialogElement;
	let dialogStoreParams: DialogStore;
	dialogStore.subscribe((value) => (dialogStoreParams = value));

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			closeDialog();
		}
	};
	function handleConfirm() {
		sleep(1000).then(() => {
			closeDialog();
		});
	}
	$: {
		dialog && ($dialogStore.isOpen ? dialog.showModal() : dialog.close());
		dialog &&
			dialog.addEventListener(
				'click',
				(e) => {
					if (e.target === dialog) {
						closeDialog();
					}
				},
				true
			);
	}
</script>

<dialog class="dialog" bind:this={dialog}>
	<div class="dialog-container">
		<div class="dialog-content">
			<div>
				{#if dialogStoreParams?.componentInDialog}
					<svelte:component
						this={dialogStoreParams.componentInDialog.component}
						{...dialogStoreParams.componentInDialog.props}
					/>
				{/if}
				{#if dialogStoreParams?.rawHtml}
					{@html dialogStoreParams.rawHtml}
				{/if}
			</div>
		</div>
		<!-- <div class="dialog-actions">
			<button type="button" on:keydown={handleKeyDown} on:click={closeDialog}>Close</button>
			<button type="button" on:keydown={handleKeyDown} on:click={handleConfirm}>Confirm</button>
		</div> -->
	</div>
</dialog>

<style>
	dialog {
		max-width: 600px;
		background-color: var(--fg);
		border: none;
	}
</style>
