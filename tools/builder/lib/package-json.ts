import fs from 'node:fs/promises';
import { PkgSchema, type Pkg } from './package-json-schema.ts';

export async function loadPackageJson(file = `${process.cwd()}/package.json`): Promise<Pkg> {
	try {
		const content = await fs.readFile(file, 'utf-8');
		return PkgSchema.parse(JSON.parse(content));
	} catch (error) {
		throw new Error(`Error loading package.json at ${file}: ${error}`, {
			cause: error,
		});
	}
}
