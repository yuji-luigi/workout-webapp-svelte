import { getMinutesFromSeconds } from './getMinutes';
import { getSeconds } from './getSeconds';
import { getTenthSeconds } from './getTenthSeconds';

export const formatSecondsToTimer = (seconds: number): string => {
	let _seconds = seconds;
	if (typeof seconds !== 'number') {
		_seconds = Number(_seconds);
	}
	return `${getMinutesFromSeconds(_seconds)}:${getTenthSeconds(_seconds)}${getSeconds(_seconds)}`;
};
