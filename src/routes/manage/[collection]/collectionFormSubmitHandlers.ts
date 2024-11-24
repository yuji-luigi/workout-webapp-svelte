export const collectionFormSubmitHandlers = {
	workout(payload: Record<string, any>, event: SubmitEvent & { target: HTMLFormElement }) {
		// loading = true;
		// const formData = new FormData(event.target as HTMLFormElement);
		// const data = Object.fromEntries(formData.entries()) as unknown as WorkoutJoined;
		try {
			console.log(payload);
			handleSaveWorkoutLocally(payload as WorkoutJoined);
			await sleep(750);
			event.target?.reset();
			onSubmitCallback && onSubmitCallback(payload);
		} catch (error: any) {
			throw new Error(error);
		}
		// loading = false;
	}
};
