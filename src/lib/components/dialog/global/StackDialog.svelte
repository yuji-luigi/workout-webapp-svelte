<script lang="ts">
	import type { Snippet, Component } from 'svelte';
	import AnimatedDialog from './AnimatedDialog.svelte';

	let {
		PassedChildren,
		childrenProps,
		...rest
	}: {
		childrenProps?: Record<string, any>;
		PassedChildren?: Component;
		fullScreen?: boolean;
		isOpen?: boolean;
		children?: Snippet;
		maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		id?: string;
	} = $props();
</script>

<AnimatedDialog {...rest}>
	<PassedChildren {...childrenProps} />
</AnimatedDialog>
