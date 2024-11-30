export function createWebsocketStates() {
	let connected = $state(false);
	let globalWebSocket = $state<WebSocket | null>(null);
	return {
		get value() {
			return connected;
		},
		setConnected: (value: boolean) => (connected = value),
		get globalWebSocket() {
			return globalWebSocket;
		},
		setGlobalWebSocket: (value: WebSocket) => (globalWebSocket = value)
	};
}
