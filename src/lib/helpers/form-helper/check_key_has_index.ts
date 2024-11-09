export function checkKeyHasIndex(key: string): boolean {
	return /^\[\d+\]/.test(key);
}
