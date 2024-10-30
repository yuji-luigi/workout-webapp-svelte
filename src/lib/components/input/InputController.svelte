<script lang="ts">
	import type { FormTableField } from '../../../types/form/table-def';

	let { formTableField }: { formTableField: FormTableField } = $props();
</script>

<div>
	{formTableField.type}
</div>
