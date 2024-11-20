import type { SvelteComponent } from 'svelte';

type WorkoutConfig = {
	n_sets: number;
	seconds_rest?: number | null;
	seconds_active?: number | null;
};
type StateData = {
	count: number;
	min: number;
	max: number;
	unit?: string;
};

export let counterDialogStates: {
	current: number | null;
	isOpen: boolean;
	content: null | (() => SvelteComponent | undefined | null);
	actions: null | (new () => SvelteComponent | undefined | null);
	data: StateData;
} = $state({
	isOpen: false,
	current: null,
	content: null,
	actions: null,
	data: {
		count: 0,
		min: 0,
		max: 0,
		unit: ''
	}
});
