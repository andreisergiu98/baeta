import { writeFile } from 'node:fs/promises';
import type { CommandModule } from 'yargs';
import { loadPackageJson } from '../lib/package-json.ts';
import {
	loadWorkspaceCatalogs,
	loadWorkspaceProject,
	loadWorkspaceVersionsMap,
} from '../lib/workspace.ts';

interface PrintResolvedVersionsArgs {
	target: string;
	out?: string;
}

// biome-ignore lint/complexity/noBannedTypes: Allow empty dictionary
export const printResolvedVersionsCommand: CommandModule<{}, PrintResolvedVersionsArgs> = {
	command: 'print-resolved-versions <target>',
	describe: 'Print the versions of workspace or catalog dependencies for package',
	builder: (yargs) => {
		return yargs
			.positional('target', {
				describe: 'Path to package.json',
				type: 'string',
				default: `${process.cwd()}/package.json`,
			})
			.option('out', {
				describe: 'Destination file to write the versions json file, otherwise prints to stdout.',
				type: 'string',
				alias: 'o',
			});
	},
	handler: async (args) => {
		const pkg = await loadPackageJson(args.target);
		const { workspaceVersions, defaultCatalog, namedCatalogs } = await getWorkspaceVersions();
		const fields = ['dependencies', 'devDependencies', 'peerDependencies'] as const;
		const results: Record<(typeof fields)[number], Record<string, string | undefined>> = {
			dependencies: {},
			devDependencies: {},
			peerDependencies: {},
		};

		for (const field of fields) {
			for (const [name, version] of Object.entries(pkg[field] ?? {})) {
				if (version == null) continue;
				if (isWorkspaceSpecifier(version)) {
					results[field][name] = resolveWorkspaceSpecifier(name, version, workspaceVersions);
				} else if (isCatalogSpecifier(version)) {
					results[field][name] = resolveCatalogSpecifier(
						name,
						version,
						defaultCatalog,
						namedCatalogs,
					);
				}
			}
		}

		const output = JSON.stringify(results, null, 2);

		if (args.out) {
			await writeFile(args.out, output, 'utf-8');
		} else {
			process.stdout.write(output);
		}
	},
};

async function getWorkspaceVersions() {
	const project = await loadWorkspaceProject();
	const workspaceVersions = await loadWorkspaceVersionsMap(project);
	const { defaultCatalog, namedCatalogs } = await loadWorkspaceCatalogs(project);

	return {
		workspaceVersions,
		defaultCatalog,
		namedCatalogs,
	};
}

function isWorkspaceSpecifier(specifier: string): specifier is `workspace:${string}` {
	return specifier.startsWith('workspace:');
}

function isCatalogSpecifier(specifier: string): specifier is `catalog:${string}` {
	return specifier.startsWith('catalog:');
}

function resolveWorkspaceSpecifier(
	pkgName: string,
	specifier: `workspace:${string}`,
	workspaceVersions: Map<string, string>,
): string {
	const actual = workspaceVersions.get(pkgName);
	if (!actual) {
		throw new Error(`"workspace:" used for "${pkgName}" but no matching workspace package found.`);
	}
	const range = specifier.split(':').at(1);
	if (range === '' || range === '*') return actual;
	if (range === '~') return `~${actual}`;
	return `^${actual}`;
}

function resolveCatalogSpecifier(
	pkgName: string,
	specifier: `catalog:${string}`,
	defaultCatalog: Map<string, string>,
	namedCatalogs: Map<string, Map<string, string>>,
): string {
	const catalogName = specifier.split(':').at(1);
	const isDefault = catalogName === '' || catalogName === 'default' || catalogName == null;

	if (isDefault) {
		const version = defaultCatalog.get(pkgName);
		if (version == null) {
			throw new Error(
				`"catalog:" used for "${pkgName}" but no entry found in the default catalog.`,
			);
		}
		return version;
	}

	const namedMap = namedCatalogs.get(catalogName);
	if (!namedMap) {
		throw new Error(
			`"catalog:${catalogName}" used for "${pkgName}" but no catalog named "${catalogName}" found.`,
		);
	}

	const version = namedMap.get(pkgName);
	if (version == null) {
		throw new Error(
			`"catalog:${catalogName}" used for "${pkgName}" but no entry found in catalog "${catalogName}".`,
		);
	}

	return version;
}
