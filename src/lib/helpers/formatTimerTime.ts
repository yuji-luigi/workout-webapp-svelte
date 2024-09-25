export const getTimerTime = (seconds: number) =>
	` ${Math.floor(seconds / 60)}:${seconds % 60 || '00'}`;
