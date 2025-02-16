<!--
@component
The context is not updating in child component(direct child component is updating. but component under that is not updating) when we are using setContext in parent component.
So store only form id to extract the form data from the store.
-->
<script lang="ts">
	import { setContext } from 'svelte';
	import { getForm, setForm } from '../../store/form/form-store.svelte';

	let {
		children,
		form_id
	}: {
		children: any;
		form_id: string;
	} = $props();
	// TODO: watch leave it here for now
	setContext('form_id', form_id);
	setContext('is_debug_form', false);
	// setContext('form', data);
	$effect(() => {
		return () => {
			setContext('form_id', '');
		};
	});
</script>

{@render children()}
