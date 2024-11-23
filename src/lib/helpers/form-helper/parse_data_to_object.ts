/* 
nested form should look like this:

name: string
description: string
workouts[0].name: string
workouts[0].description: string
workouts[1].name: string
workouts[1].description: string
*/

import { isJsonString } from './isJsonString';

export function parseFormDataToObjects(formData: FormData, multiNames: string[] = []) {
	const entries = Array.from(formData.entries());
	const data: Record<string, any> = {};

	// Iterate through form entries and build a structured object
	for (const [key, _value] of entries) {
		const keys = key.split(/[\[\]\.]+/).filter(Boolean);
		let value = structuredClone(_value);
		let current = data;

		for (let i = 0; i < keys.length; i++) {
			const part = keys[i];
			if (i === keys.length - 1 && isJsonString(value)) {
				value = JSON.parse(value);
			}

			// need to specify the case of  multi select.
			// if the same key is passed and the i length is the last one and there is already a value present, then push the value to the array.
			if (i === keys.length - 1 && /* current[part] || */ multiNames.includes(part)) {
				if (Array.isArray(current[part])) {
					current[part].push(value);
				} else {
					current[part] = [value];
				}
				continue;
			}
			if (i === keys.length - 1 && !multiNames.includes(part) && current[part]) {
				if (Array.isArray(current[part])) {
					current[part].push(value);
				} else {
					current[part] = value;
				}
				continue;
			}

			// case the key is the last one, set the value
			if (i === keys.length - 1) {
				// Set the value at the last key
				current[part] = value;
			} else {
				// NOTE: (isNaN(Number(keys[i + 1])) checks the next key is a number or not. if a number, initialize an array
				// Initialize the nested object/array if not present
				current[part] = current[part] || (isNaN(Number(keys[i + 1])) ? {} : []);
				current = current[part];
			}
		}
	}
	return data;
	// Transform structured data into an array of objects
	// return Object.values(data.sets || {});
}
