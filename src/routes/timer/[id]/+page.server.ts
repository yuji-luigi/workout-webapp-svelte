import { error } from '@sveltejs/kit';
import type { Timer } from '../../../types/db/interval.js';

export async function load({ params, fetch }) {
	const rawTimers = await fetch('/src/data/timers.json');
	const timers = await rawTimers.json();
	const interval = timers.find((interval: Timer) => interval.id === +params.id);
	if (!interval) {
		return error(404, 'Timer not found');
	}
	return {
		interval
	};
}
