import type { SvelteComponent } from 'svelte';
import type { get } from 'svelte/store';
type WorkoutConfig = {
	n_sets: number;
	seconds_rest?: number | null;
	seconds_active?: number | null;
};
type StateData = Record<string, WorkoutConfig> | null;

export let countDialogStates = () => {
	let states: {
		current: number | null;
		content: null | (() => SvelteComponent | undefined | null);
		actions: null | (new () => SvelteComponent | undefined | null);
		data: StateData;
		test?: string;
	} = $state({
		current: null,
		content: null,
		actions: null,
		data: null,
		test: 'test'
	});
	return {
		states,
		get data() {
			return states.data;
		},
		get content() {
			return states.content;
		},
		set content(content: null | (() => SvelteComponent | undefined | null)) {
			states = { ...states, content };
		},

		set actions(actions: null | (new () => SvelteComponent | undefined | null)) {
			states.actions = actions;
		},
		getDataById(id: number) {
			if (!states.data?.[id]) {
				states.data = {
					...states.data,
					[id]: {
						n_sets: 1
					}
				};
			}
			return states.data?.[id];
		},
		setDataById({ id, data }: { id: number; data: WorkoutConfig }) {
			states.data = {
				...states.data,
				[id]: data
			};
		},
		reset() {
			states.actions = null;
			states.content = null;
			states.data = null;
		}
	};
};
