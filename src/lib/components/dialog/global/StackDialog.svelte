<script lang="ts">
	import type { Snippet, Component } from 'svelte';
	import AnimatedDialog from './AnimatedDialog.svelte';
	import { closeStackDialogNew } from '../../../store/dialog-stack/dialogStackStoreNew';

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

<AnimatedDialog closeStackDialogCB={closeStackDialogNew} {...rest}>
	<PassedChildren {...childrenProps} />
</AnimatedDialog>
