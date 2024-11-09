export function isJsonString(str: any): str is string {
	try {
		JSON.parse(str as string);
	} catch (e) {
		return false;
	}
	return true;
}
