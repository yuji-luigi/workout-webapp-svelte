import * as Y from 'yjs';

// Define the schema for your YDB keys and values
interface YDBSchema {
	workouts: Y.Array<ExerciseJoined>;
	exercises: Y.Array<Exercise>;
}

// TypedYMap wrapper for specific keys and types
export class TypedYMap<T> {
	private map: Y.Map<any>;

	constructor(map: Y.Map<any>) {
		this.map = map;
	}

	// Typed getter that ensures the returned type matches the schema
	get<K extends keyof T>(key: K): T[K] | undefined {
		return this.map.get(key as string) as T[K] | undefined;
	}

	// Typed setter
	set<K extends keyof T>(key: K, value: T[K]): void {
		this.map.set(key as string, value);
	}
}

// YDocTMap class with Proxy to type getMap
// class YDocTMap<T> extends Y.Doc {
// 	constructor() {
// 		super();

// 		return new Proxy(this, {
// 			get: (target, prop) => {
// 				if (prop === 'getMap') {
// 					// Intercept getMap to return a TypedYMap
// 					return (name: keyof T) => {
// 						const yMap = target.getMap(name as string);
// 						return new TypedYMap<T>(yMap);
// 					};
// 				}
// 				// Forward all other properties and methods to Y.Doc
// 				return target[prop as keyof Y.Doc];
// 			}
// 		}) as Y.Doc & { getMap: (name: keyof T) => TypedYMap<T> };
// 	}
// }

// Usage example
// const ytDoc = new YDocTMap<YDBSchema>();

// Accessing the typed map
// const map = ytDoc.getMap('workouts'); // Returns TypedYMap<YDBSchema>

// import * as Y from 'yjs';
import type { Exercise, ExerciseJoined } from '../../../types/db/exercise';

// Define the schema for your YDB keys and values
interface YDBSchema {
	workouts: Y.Array<ExerciseJoined>;
	exercises: Y.Array<Exercise>;
}

// TypedYMap class that enforces typing for specific keys and values
// class TypedYMap<T> {
// 	private map: Y.Map<any>;

// 	constructor(map: Y.Map<any>) {
// 		this.map = map;
// 	}

// 	// Typed getter
// 	get<K extends keyof T>(key: K): T[K] | undefined {
// 		return this.map.get(key as string) as T[K] | undefined;
// 	}

// 	// Typed setter
// 	set<K extends keyof T>(key: K, value: T[K]): void {
// 		this.map.set(key as string, value);
// 	}
// }

// Typed YDoc wrapper class for creating typed maps
class TypedYDoc<T extends Record<string, any>> {
	private ydoc: Y.Doc;

	constructor() {
		this.ydoc = new Y.Doc();
	}

	// Get a typed map from Y.Doc based on the schema type
	getTypedMap<K extends keyof T>(name: K): TypedYMap<T> {
		const map = this.ydoc.getMap(name as string) as Y.Map<T>;
		return new TypedYMap<T>(map);
	}
}

// Usage example
const typedYDoc = new TypedYDoc<YDBSchema>();

// Accessing the typed map
const workoutsMap = typedYDoc.getTypedMap('workouts'); // Returns TypedYMap<YDBSchema>
const workoutArray = workoutsMap.get('workouts'); // Type is Y.Array<ExerciseJoined> | undefined
