// number to 3:00 format
export const formatTime = (time: number): string => {
	let hours: NumStr = Math.floor(time / 3600);
	hours = hours < 10 ? `0${hours}` : hours;
	let minutes: NumStr = Math.floor((time % 3600) / 60);
	minutes = minutes < 10 ? `0${minutes}` : minutes;
	let seconds: NumStr = time % 60;
	seconds = seconds < 10 ? `0${seconds}` : seconds;
	const str = `${hours}:${minutes}:${seconds}`;

	return str;
};
type NumStr = number | string;
