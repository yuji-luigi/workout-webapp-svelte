async function addImageToYjs(file: File, imageName: string) {
	const arrayBuffer = await file.arrayBuffer();
	const uint8Array = new Uint8Array(arrayBuffer);
	// Store the Uint8Array in the Y.Map with a key (image name)
	// imagesY.set(imageName, uint8Array);
	return uint8Array;
}
