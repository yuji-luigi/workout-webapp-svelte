<script>
	import { getContext } from 'svelte';
	import Parent from '../../lib/experiment/Parent.svelte';
	import Child from '../../lib/experiment/Child.svelte';
	let variable = getContext('parent');
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<Parent>
	<h1>{variable}</h1>
	<button onclick={() => (variable = new Date().toISOString())}> Click to change context </button>
	<Child>
		<h1>Child</h1>
	</Child>
</Parent>
