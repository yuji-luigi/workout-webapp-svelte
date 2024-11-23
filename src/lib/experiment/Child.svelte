<script>
	export const CONTEXT = {};
	import { getContext, setContext } from 'svelte';
	let { children } = $props();
	let variable = $state('string');
	getContext('parent');
</script>

<div>
	{@render children()}
	child: {JSON.stringify(variable)}
</div>
