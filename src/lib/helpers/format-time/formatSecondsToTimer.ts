import { getMinutesFromSeconds } from './getMinutes';
import { getSeconds } from './getSeconds';
import { getTenthSeconds } from './getTenthSeconds';

export const formatSecondsToTimer = (seconds: number): string =>
	`${getMinutesFromSeconds(seconds)}:${getTenthSeconds(seconds)}${getSeconds(seconds)}`;
