let connected = $state(false);
let globalWebSocket = $state<WebSocket | null>(null);

export function createWebsocketStates() {
	return {
		get isConnected() {
			return connected;
		},
		setConnected: (value: boolean) => (connected = value),
		get globalWebSocket() {
			return globalWebSocket;
		},
		setGlobalWebSocket: (value: WebSocket) => {
			globalWebSocket = value;
			connected = true;
		}
	};
}
