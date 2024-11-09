export function setNestedValue(obj: any, key: string, value: any) {
	const keys = key.match(/([^[\]]+)|(\[\d+\])/g);
	if (!keys) return;

	let current = obj;

	for (let i = 0; i < keys.length; i++) {
		const part = keys[i];

		// Check if it's an array index (e.g., [0])
		const isArrayIndex = part.startsWith('[') && part.endsWith(']');
		const keyName = isArrayIndex ? parseInt(part.slice(1, -1), 10) : part;

		if (i === keys.length - 1) {
			// Last part: set the value
			current[keyName] = value;
		} else {
			// Intermediate part: create object/array if it doesn't exist
			if (isArrayIndex) {
				if (!Array.isArray(current)) current = current[keyName] = [];
				if (!current[keyName]) current[keyName] = [];
			} else {
				if (typeof current[keyName] !== 'object' || current[keyName] === null) {
					current[keyName] = {};
				}
			}
			current = current[keyName];
		}
	}
}
