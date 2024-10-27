export function createConnected() {
	let connected = $state(false);

	return {
		get value() {
			return connected;
		},
		setConnected: (value: boolean) => (connected = value)
	};
}
