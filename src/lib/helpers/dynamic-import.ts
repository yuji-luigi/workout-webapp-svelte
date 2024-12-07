// src/lib/utils/clientImport.ts
export async function clientImport<T>(importer: () => Promise<T>): Promise<T | null> {
	if (typeof window !== 'undefined') {
		return await importer();
	}
	return { default: null } as any;
}
