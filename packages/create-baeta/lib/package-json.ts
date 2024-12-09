import apolloPackageJson from '../meta/apollo/package.json';
import yogaPackageJson from '../meta/yoga/package.json';
import dependenciesVersions from '../versions.json';
import type { JavaScriptRuntime } from './constants.ts';

function createPackageJSON(
	appName: string,
	runtime: JavaScriptRuntime,
	packageJson: {
		name: string;
		scripts: Record<string, string | undefined>;
		dependencies: Record<string, string | undefined>;
		devDependencies: Record<string, string | undefined>;
	},
) {
	const meta = structuredClone(packageJson);

	for (const [dep, version] of Object.entries(dependenciesVersions)) {
		if (dep in meta.dependencies) {
			meta.dependencies[dep] = version;
		} else if (dep in packageJson.devDependencies) {
			meta.devDependencies[dep] = version;
		}
	}

	if (runtime === 'node') {
		meta.devDependencies['@types/bun'] = undefined;
		meta.devDependencies['@types/deno'] = undefined;
	}

	if (runtime === 'bun') {
		meta.scripts.start = `baeta generate --watch --run='bun --watch --inspect src/app.ts'`;
		meta.devDependencies['@types/node'] = undefined;
		meta.devDependencies['@types/deno'] = undefined;
	}

	if (runtime === 'deno') {
		meta.scripts.start = `baeta generate --watch --run='deno --watch --allow-env --allow-read --allow-net src/app.ts'`;
		meta.devDependencies['@types/node'] = undefined;
		meta.devDependencies['@types/bun'] = undefined;
	}

	meta.name = appName;

	return JSON.stringify(meta, null, 2);
}

export function getPackageJson(appName: string, runtime: JavaScriptRuntime, templateName: string) {
	if (templateName === 'yoga') {
		return createPackageJSON(appName, runtime, yogaPackageJson);
	}

	if (templateName === 'apollo') {
		return createPackageJSON(appName, runtime, apolloPackageJson);
	}
}
