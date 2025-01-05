export function hasId<T extends { id?: number }>(obj: T): obj is T & { id: number } {
	return typeof obj.id === 'number';
}
