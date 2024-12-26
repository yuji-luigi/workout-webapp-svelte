<script lang="ts">
	import { onMount } from 'svelte';
	import { db } from '../../db/dexie-db/dexie-db';
	import type { Results } from './fetcherData';
	import { sleep } from '../../helpers/sleep';

	let {
		fetcher,
		url,
		results = $bindable({ isLoading: true, data: null, error: null })
	}: {
		results: Results | null;
		fetcher?: () => Promise<any>;
		url?: string;
	} = $props();
	onMount(async () => {
		try {
			if (!fetcher && !url) {
				throw new Error('Fetcher or URL must be provided');
			}
			if (fetcher) {
				const _data = await fetcher();
				results = { ...results, data: _data, isLoading: false };
				return;
			}
			if (url) {
				const response = await fetch(url);
				const _data = await response.json();
				results = { ...results, data: _data, isLoading: false };
				return;
			}
		} catch (error: any) {
			console.error(error);
			results = { ...results, error: error.message || error, isLoading: false };
		}
	});
</script>
