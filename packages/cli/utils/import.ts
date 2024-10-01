export const dynamicImport = new Function('file', 'return import(file)') as <T = any>(
	file: string,
) => Promise<T>;
