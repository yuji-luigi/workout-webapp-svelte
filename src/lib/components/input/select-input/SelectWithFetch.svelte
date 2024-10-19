<script lang="ts">
	import { onMount } from 'svelte';
	import SelectInputMulti from './base/SelectInputMulti.svelte';
	import { createQueryParams } from '../../../helpers/search-params/createQueryParams';
	let {
		endpoint,
		options,
		loading = true,
		...props
	}: {
		name: string;
		label: string;
		className?: string;
		endpoint: string;
		options?: any[];
		loading?: boolean;
		fetchOptions: {
			params: Record<string, string>;
		};
	} = $props();

	onMount(async () => {
		// type guard no short-circuit
		if (options && options.length > 0) {
			loading = false;
			return;
		}

		const query = createQueryParams(props.fetchOptions.params);
		const response = await fetch(endpoint + query);
		options = await response.json();
		loading = false;
	});
</script>

<SelectInputMulti {...props} {options} {loading} />
