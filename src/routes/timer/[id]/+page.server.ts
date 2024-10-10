import { error } from '@sveltejs/kit';
import type { Timer } from '../../../types/db/timer.js';

export async function load({ params, fetch }) {
	const rawTimers = await fetch('/src/data/timers.json');
	const timers = await rawTimers.json();
	const timer = timers.find((timer: Timer) => timer.id === +params.id);
	if (!timer) {
		return error(404, 'Timer not found');
	}
	return {
		timer
	};
}
