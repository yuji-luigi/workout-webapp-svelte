import { onMount } from 'svelte';
import type { RoutineJoined } from '../../../types/db/routine';
import { db } from '../../db/dexie-db/dexie-db';
import { getIntervalTimer, IntervalTimer } from '../timers/interval_timer.svelte';
import type { RoutineBlockJoined } from '../../../types/db/routine_block_interface';

export const routinesStore: {
	list: RoutineJoined[];
	loading: boolean;
	currentRoutine: RoutineJoined | null;
	error: string | null | unknown;
} = $state({
	list: [],
	currentRoutine: null,
	loading: false,
	error: null
});

export const getRoutines = async () => {
	routinesStore.loading = true;
	try {
		const routines = await db.routines.toArray();
		routinesStore.list = routines;
	} catch (error) {
		routinesStore.error = error;
	} finally {
		routinesStore.loading = false;
	}
};
export class CurrentRoutineStore {
	routine: RoutineJoined | null = $state(routinesStore.currentRoutine);
	#intervalTimer: IntervalTimer = $state(getIntervalTimer());
	currentBlock = $derived.by<RoutineBlockJoined | null>(() => {
		console.log(this.#intervalTimer.blockIndex);
		return this.routine?.blocks[this.#intervalTimer.blockIndex] ?? null;
	});
	constructor(routine: RoutineJoined) {
		this.routine = routine;
		this.#intervalTimer = getIntervalTimer();
	}
}

let currentRoutineStore: CurrentRoutineStore | null = null;

export const initCurrentRoutineStore = (routine: RoutineJoined) => {
	currentRoutineStore = new CurrentRoutineStore(routine);
};

export const getCurrentRoutineStore = () => currentRoutineStore;
