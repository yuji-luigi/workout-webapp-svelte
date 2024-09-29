export const getTimerTime = (seconds: number) => {
	if (seconds < 0) return '0:00';
	let _seconds: string | number = seconds % 60;
	_seconds = _seconds < 10 ? `0${_seconds}` : _seconds;
	return `${Math.floor(seconds / 60)}:${_seconds || '00'}`;
};
