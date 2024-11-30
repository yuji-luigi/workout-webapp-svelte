import * as Y from 'yjs';

// Define the schema for your YDB keys and values

// TypedYMap wrapper for specific keys and types
export class TypedYMap<T> extends Y.Map<any> {
	// Enforce typing for each key based on schema
	get<K extends Extract<keyof T, string>>(key: K): T[K] | undefined {
		return super.get(key) as T[K] | undefined;
	}
	// @ts-expect-error: T[K] cannot be VAL Which is the type of the value argument
	set<K extends Extract<keyof T, string>>(key: K, value: T[K]): T[K] {
		return this.set(key, value);
	}
}
