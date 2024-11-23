<script lang="ts">
	import Chip from './Chip.svelte';

	let {
		name,
		value,
		...other
	}: {
		data_set_key?: string | number;
		cursor?: string;
		children?: any;
		name: string;
		value: string;
	} = $props();
</script>

<Chip {...other} />
<input type="text" hidden {name} {value} />
