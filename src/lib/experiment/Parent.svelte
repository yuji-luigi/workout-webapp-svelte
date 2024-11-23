<script>
	import { setContext } from 'svelte';
	let { children } = $props();
	let variable = $state('string');
	setContext('parent', variable);
</script>

<button onclick={() => (variable = new Date().toISOString())}> Click to change context </button>
{@render children()}
