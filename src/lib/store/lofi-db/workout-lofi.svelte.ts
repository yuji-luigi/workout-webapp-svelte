// This is where most of the interesting stuff lives

import { IndexeddbPersistence } from 'y-indexeddb';
import { WebsocketProvider } from 'y-websocket';

import * as Y from 'yjs';
import type { Workout } from '../../../types/db/workout';

const DB_NAME = 'myDB';
const ydoc = new Y.Doc();
const roomName = DB_NAME;
const indexeddbProvider = new IndexeddbPersistence(roomName, ydoc);
// Connect to the WebSocket server
const provider = new WebsocketProvider(
	'ws://localhost:1234', // WebSocket server URL
	'my-yjs-room', // Room name or document ID
	ydoc
);

// Initialize counter
export const yWorkout = ydoc.getMap<Workout>('workout');
export const yRoutine = ydoc.getMap('routine');

async function create_app_state() {
	// On create get the value from yWorkout or create one
	let workoutLocal = $state(yWorkout.get('value'));

	//
	yWorkout.observeDeep(() => {
		workoutLocal = yWorkout.get('value');
	});

	indexeddbProvider.whenSynced.then(() => {
		workoutLocal = yWorkout.get('value');
	});

	return {
		get workoutLocal() {
			return workoutLocal;
		}
	};
}

export const workout_state = await create_app_state();
