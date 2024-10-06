export const dynamicImport = new Function('file', 'return import(file)') as <T = unknown>(
	file: string,
) => Promise<T>;
