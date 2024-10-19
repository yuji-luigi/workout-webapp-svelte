<script lang="ts">
	import type { Option } from '../../../../types/form/option';
	import type { InputType } from '../../../../types/input-type';
	import InputGroupGrid from '../InputGroupGrid.svelte';
	import SelectInputSingle from './base/SelectInputSingle.svelte';
	export let label: string;
	export let name: string;
	export let className: string = '';
	export let options: Option[];
</script>

<InputGroupGrid {className} {label}>
	<slot slot="input">
		<SelectInputSingle {options} {name} />
	</slot>
</InputGroupGrid>
