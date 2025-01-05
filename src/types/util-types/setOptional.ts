// Makes certain keys in T optional
export type SetOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type IDOptional<T extends { id: number }> = SetOptional<T, 'id'>;
