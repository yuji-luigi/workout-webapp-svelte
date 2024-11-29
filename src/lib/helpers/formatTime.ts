// number to 3:00 format
export const formatTime = (time: number): string => {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	return `${minutes}:${minutes < 10 ? `0${minutes}` : minutes}`;
};
