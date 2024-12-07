import fs from 'node:fs/promises';

// biome-ignore lint/suspicious/noExplicitAny: TODO: add config validation, but since it is already typed, it is not a priority
export type ConfigModule = any;

export function selectConfigFromModule(module: ConfigModule) {
	return module?.default?.default?.config || module?.default?.config || module?.config;
}

let cachedPkg: Record<string, unknown> | null = null;
export async function getPackageJSON(): Promise<Record<string, unknown> | null> {
	if (cachedPkg) {
		return cachedPkg;
	}

	try {
		const content = await fs.readFile(`${process.cwd()}/package.json`, 'utf-8');
		const parsed = JSON.parse(content);

		if (typeof parsed !== 'object') {
			return null;
		}

		cachedPkg = parsed;
		return parsed;
	} catch (e) {
		return null;
	}
}

export async function getLoaderType(configPath: string): Promise<'esm' | 'cjs'> {
	if (/\.m(ts|js)$/.test(configPath)) {
		return 'esm';
	}

	if (/\.c(ts|js)$/.test(configPath)) {
		return 'cjs';
	}

	const pkg = await getPackageJSON();

	if (pkg == null) {
		return 'esm';
	}

	return pkg.type === 'module' ? 'esm' : 'cjs';
}
