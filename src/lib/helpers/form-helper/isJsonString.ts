export function isJsonString(str: string | number | boolean) {
	try {
		JSON.parse(str as string);
	} catch (e) {
		return false;
	}
	return true;
}
