<script lang="ts">
	let {
		children,
		onclick,
		onkeydown,
		tabindex = 0,
		...rest
	}: {
		tabindex?: number;
		children: any;
		onclick: () => void;
		onkeydown?: () => void;
		class: string;
	} = $props();
</script>

<div class={rest.class} {tabindex} role="button" {onclick} {onkeydown}>
	{@render children?.()}
</div>
