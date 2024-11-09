import type { SvelteComponent } from 'svelte';

export let countDialogStates: {
	content: () => SvelteComponent | undefined | null;
	actions: new () => SvelteComponent | undefined | null;
	count: number;
} = $state({
	content: null,
	actions: null,
	count: 0
});
