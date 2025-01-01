<script lang="ts">
	import { formatSecondsToTimer } from '../../../../../../helpers/format-time/formatSecondsToTimer';
	import { openStackDialog } from '../../../../../../store/dialog-stack/dialogStackStore';
	import { getFormIDContext } from '../../../../../../store/form-store.svelte';
	import Input from '../../../../../input/Input.svelte';
	import TimerInputDialog from '../dialog-contents/TimerInputDialog.svelte';
	let { name, label = '', suffix }: { name: string; label?: string; suffix?: string } = $props();
	let value = $state(0);

	async function handleOpenDialog() {
		value = await new Promise((resolve, _) =>
			openStackDialog({
				component: TimerInputDialog,
				props: { resolve }
			})
		);
		// const form = document.getElementById(form_id) as HTMLFormElement;
		// form.dispatchEvent(new Event('input'));
	}
</script>

<Input type="number" hidden bind:value {name} />
<button class="input" type="button" onclick={handleOpenDialog}>
	<div class="flex-row">
		<span>
			{formatSecondsToTimer(value)}
		</span>
		{#if suffix}
			<span>{suffix}</span>
		{/if}
	</div>
</button>

<style>
	.flex-row {
		justify-content: space-between;
		align-items: center;
	}
</style>
