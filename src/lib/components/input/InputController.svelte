<script lang="ts">
	import InputGrid from './InputGrid.svelte';
	import SelectInputMulti from './select-input/SelectInputMulti.svelte';
	import { InputMap } from './select-input';
	export let formField: any = {};
	const Input = InputMap[formField.type] || InputGrid;
</script>

<Input {label} {name} {type} {className} {formField} />
