import { error } from '@sveltejs/kit';
import type { Interval } from '../../../types/db/interval.js';

export async function load({ params, fetch }) {
	const rawTimers = await fetch('/src/data/timers.json');
	const timers = await rawTimers.json();
	const interval = timers.find((interval: Interval) => interval.id === +params.id);
	if (!interval) {
		return error(404, 'Interval not found');
	}
	return {
		interval
	};
}
