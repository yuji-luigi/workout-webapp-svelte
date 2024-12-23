export function getTenthSeconds(seconds: number): number {
	return Math.floor((seconds % 60) / 10);
}
