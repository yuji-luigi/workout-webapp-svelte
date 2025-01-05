// ValidationError.ts
export class ValidationError extends Error {
	errors: Record<string, string>;

	constructor(errors: Record<string, string>) {
		const message = Object.entries(errors)
			.map(([field, errMsg]) => `field ${field} ${errMsg.toLowerCase()}`)
			.join(', ');
		super(message);
		// name as ValidationError to be consistent with the other errors
		this.name = 'ValidationError';
		this.errors = errors;
	}
}
