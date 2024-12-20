export function isValidJSON(json: any): json is string {
	try {
		JSON.parse(json);
		return true;
	} catch (e) {
		return false;
	}
}
