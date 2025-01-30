<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		onclick,
		disabled = false,
		children,
		type = 'button',
		className = ''
	}: {
		type: 'button' | 'submit' | 'reset';
		onclick: () => void;
		disabled?: boolean;
		children: Snippet;
		className?: string;
	} = $props();
</script>

<button
	{disabled}
	{onclick}
	{type}
	class="button-primary-reactive-color button-reactive-size {className}"
>
	{@render children()}
</button>

<style>
	button {
		width: 100%;
		height: 100%;
	}
</style>
