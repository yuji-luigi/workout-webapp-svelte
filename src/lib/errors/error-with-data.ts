class ErrorWithDetails extends Error {
	details: {
		stack?: string;
		/* message specific to the error */
		message?: string;
	};
	constructor(
		/* message generic for users */
		message: string,
		{
			details
		}: {
			details: {
				stack?: string;
				message: string;
			};
		}
	) {
		super(message);
		this.details = details;
		// if (Error.captureStackTrace) {
		// 	super.captureStackTrace(this, ErrorWithDetails);
		// }
	}
}
