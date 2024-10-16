export function createConnected() {
	let connected = $state(0);

	return {
		get value() {
			return connected;
		},
		setConnected: (value: boolean) => (connected = value)
	};
}
