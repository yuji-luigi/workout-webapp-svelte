<script>
	import { getFormIDContext } from '../../store/form-store.svelte';

	let { value = $bindable(), ...rest } = $props();
	const form_id = getFormIDContext();
	$effect(() => {
		value;
		const form = document.getElementById(form_id);
		if (form) {
			form.dispatchEvent(new Event('input'));
		}
	});
</script>

<input {...rest} bind:value />
