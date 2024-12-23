<script lang="ts">
	import { formatSecondsToTimer } from '../../../../../helpers/format-time/formatSecondsToTimer';
	import { openStackDialog } from '../../../../../store/dialog-stack/dialogStackStore';
	import TimerInputDialog from './TimerInputDialog.svelte';
	let { name, label = '' }: { name: string; label?: string } = $props();

	let value = $state(0);
	async function handleOpenDialog() {
		value = await new Promise((resolve, _) =>
			openStackDialog({
				component: TimerInputDialog,
				props: { resolve }
			})
		);
		console.log(value);
	}
</script>

<input type="number" hidden bind:value {name} />
<button class="input" onclick={handleOpenDialog}>{formatSecondsToTimer(value)}</button>
