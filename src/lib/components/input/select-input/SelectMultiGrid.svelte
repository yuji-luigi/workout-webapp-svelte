<script lang="ts">
	import InputGroupGrid from '../InputGroupGrid.svelte';
	import SelectInputMulti from './base/SelectInputMulti.svelte';
	export let label: string;
	export let name: string;
	export let className: string = '';
</script>

<InputGroupGrid {className} {label}>
	<slot slot="input">
		<SelectInputMulti {name} />
	</slot>
</InputGroupGrid>
