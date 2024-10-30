<script lang="ts">
	import type { FormTableField } from '../../../types/form/table-def';

	let {
		list,
		formTableFields
	}: {
		list: any[];
		formTableFields: FormTableField[];
	} = $props();
</script>

<table>
	<tbody>
		<tr>
			{#each formTableFields as row}
				{#if row.tableConfig?.hidden !== true}
					<th>{row.label}</th>
				{/if}
			{/each}
		</tr>
		{#each list as item}
			<tr>
				{#each formTableFields as row}
					{#if row.tableConfig?.hidden !== true}
						<td>{(item as any)[row.name]}</td>
					{/if}
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--font-size-sm);
	}
	th,
	td {
		border: 1px solid var(--text-color);
		padding: 0.5em;
	}
	th,
	td {
		white-space: nowrap;
		padding: 0.5em;
	}
</style>
