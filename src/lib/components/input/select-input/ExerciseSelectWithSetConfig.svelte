<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { FormTableField } from '../../../../types/form/form-table-field';
	import SetConfigureSection from '../../form/form-by-collection/workout-form/workout-set-configure-modal/SetConfigureSection.svelte';
	import { getFormIdCtx } from '../../../store/form/form-context';
	import { getForm } from '../../../store/form/form-store.svelte';
	import type { RoutineBlockJoined } from '../../../../types/db/routine_block_interface';

	let {
		className,
		label,
		name,
		...other
	}: FormTableField & {
		name: string;
		label: string;
		className?: string;
		input: Snippet;
		loading: boolean;
	} = $props();
	const form = getForm(getFormIdCtx());
	const editingBlocks: RoutineBlockJoined[] | undefined = form?.blocks;
</script>

<section class="set-config-section-container">
	<SetConfigureSection {name} {editingBlocks} />
</section>

<style>
	.set-config-section-container {
		grid-column: 1 / -1;
	}
</style>
