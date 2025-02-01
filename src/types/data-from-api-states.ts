export type DataFromApiState<T> = {
	list: T[];
	loading: boolean;
	error: string | null | unknown;
};
