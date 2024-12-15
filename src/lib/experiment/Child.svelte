<script>
	export const CONTEXT = {};
	import { getContext, setContext } from 'svelte';
	let { children } = $props();
	let variable = $state('string');
	getContext('parent');
	const id = getContext('form_id');
	console.log('hey', id);
</script>

<div>
	{@render children()}
	child: {JSON.stringify(variable)}
</div>
