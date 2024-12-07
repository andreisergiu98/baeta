import { dynamicImport } from './import.ts';

export async function dynamicImportCompiler() {
	return dynamicImport('@baeta/compiler') as Promise<typeof import('@baeta/compiler')>;
}
