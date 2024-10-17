<script lang="ts">
	export let label: string;
	export let className: string = '';
</script>

<div class={`input-group ${className}`}>
	<label for="name">{label}</label>
	<slot name="input" />
</div>

<style>
	.input-group {
		display: grid;
		grid-column: span 2;
		gap: 0.5rem;
		grid-template-columns: subgrid;
		grid-auto-flow: dense;
		align-items: baseline;
		justify-items: end;
	}

	@container (max-width: 600px) {
		form {
			grid-template-columns: 1fr;
			max-width: 400px;
			margin-inline: auto;
		}
		.input-group {
			gap: 0.25rem;
			justify-items: start;
			grid-column: 1/-1;
		}
	}
</style>
