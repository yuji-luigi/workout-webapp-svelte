function accessIndex(key: string): string | null {
	const match = key.match(/^[a-zA-Z0-9_]+(\[\d+\])/);
	return match ? match[0] : null;
}
