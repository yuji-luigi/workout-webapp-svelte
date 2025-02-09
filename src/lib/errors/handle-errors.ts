function handleError(error: unknown) {
	if (error instanceof ErrorWithDetails) {
		console.error(`User Error: ${error.message}`);
		console.debug(`Developer Details: ${error.details}`);
	} else if (error instanceof Error) {
		console.error(`Error: ${error.message}`);
	} else {
		console.error(`Unknown Error:`, error);
	}
}
