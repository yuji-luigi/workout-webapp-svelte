<script lang="ts">
	import { sleep } from '../../helpers/sleep';

	let {
		loading,
		className,
		handleSubmit,
		children,
		form_id = ''
	}: {
		loading?: boolean;
		className?: string | undefined;
		handleSubmit?: (event: SubmitEvent) => Promise<void>;
		children?: any;
		form_id?: string;
	} = $props();
	async function onsubmit(event: SubmitEvent) {
		try {
			loading = true;
			await handleSubmit?.(event);
			await sleep(2000);
		} catch (error: any) {
			throw new Error(error);
		}
		loading = false;
	}
</script>

<div class={className}>
	<fieldset disabled={loading} aria-busy={loading}>
		{#if form_id}
			<form id={form_id} {onsubmit}>
				{@render children?.()}
			</form>
		{:else}
			<form {onsubmit}>
				{@render children?.()}
			</form>
		{/if}
	</fieldset>
</div>

<style>
	fieldset {
		container-type: inline-size;
		border: none;
		border-radius: 5px;
		padding: 1rem;
		transition: opacity 0.3s ease-in-out;
		&[disabled] {
			opacity: 0.5;
		}
	}

	form {
		max-width: var(--max-width);
		display: grid;
		grid-template-columns: repeat(2, auto 1fr);
		gap: 1rem;
	}

	@container (max-width: 600px) {
		form {
			grid-template-columns: 1fr;
			max-width: 400px;
			margin-inline: auto;
		}
	}
</style>
