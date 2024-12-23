<script lang="ts">
	import { formatSecondsToTimer } from '../../../../../helpers/format-time/formatSecondsToTimer';
	import { openStackDialog } from '../../../../../store/dialog-stack/dialogStackStore';
	import { getFormIDContext } from '../../../../../store/form-store.svelte';
	import Input from '../../../../input/Input.svelte';
	import TimerInputDialog from './TimerInputDialog.svelte';
	let { name, label = '' }: { name: string; label?: string } = $props();
	const form_id = getFormIDContext();
	let value = $state(0);
	console.log(name);

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
<button class="input" onclick={handleOpenDialog}>{formatSecondsToTimer(value)}</button>
