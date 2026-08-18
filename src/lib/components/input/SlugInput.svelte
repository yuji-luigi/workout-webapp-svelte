<script lang="ts">
	import { getContext } from 'svelte';
	import type { SlugFormTableField } from '../../../types/form/form-table-field';
	import type { InputProps } from '../../../types/form/input-prop-type';
	import InputGroupGrid from './InputGroupGrid.svelte';
	import { getForm } from '../../store/form/form-store.svelte';
	import { createSlug } from '../../helpers/createSlug';

	let { input, from = 'name', ...others }: SlugFormTableField = $props();
	const form_id = getContext('form_id');
	let form = $state(getForm(form_id));
	let slug = $state('');
	$effect(() => {
		form = getForm(form_id);
		if (form) {
			const name = form[from];
			// create a slug from the form[from] value. convert to lowercase and replace spaces with hyphens
			slug = createSlug(name);
		}
	});
</script>

<input {...others} bind:value={slug} type="text" />

<style>
	div {
		margin-right: auto;
		margin-block: auto;
		display: flex;
	}
	input[type='hidden'] {
		display: none;
	}
</style>
