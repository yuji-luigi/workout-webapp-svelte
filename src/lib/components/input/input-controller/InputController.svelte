<script lang="ts">
	import type { FormTableField } from '../../../../types/form/form-table-field';
	import * as Inputs from './index';
	import { isInputKey } from './isInputKey';

	// Extract `formTableField` from props
	let { formTableField }: { formTableField: FormTableField } = $props();

	let Input: any = $state();
	Input = Inputs['TextInput'];
	if (isInputKey(formTableField.type)) {
		Input = Inputs[formTableField.type];
	}
</script>

<Input {...formTableField} />
