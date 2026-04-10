import { open, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { Configuration, Project, structUtils } from '@yarnpkg/core';
import { npath, ppath } from '@yarnpkg/fslib';
import { parse as parseYaml } from 'yaml';
import type { CommandModule } from 'yargs';
import z from 'zod';
import { loadPackageJson } from '../lib/package-json.ts';

interface PrintResolvedVersionsArgs {
	target: string;
	out?: string;
}

const YarnRcSchema = z.object({
	catalog: z.record(z.string(), z.string()).optional(),
	catalogs: z.record(z.string(), z.record(z.string(), z.string())).optional(),
});

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
	const project = await loadProject(process.cwd());
	const workspaceVersions = await loadWorkspaceVersions(project);
	const { defaultCatalog, namedCatalogs } = await loadCatalogs(project);

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

async function loadProject(absPath: string): Promise<Project> {
	const portableCwd = ppath.dirname(npath.toPortablePath(absPath));
	const configuration = await Configuration.find(portableCwd, null, {
		strict: false,
	});
	const { project } = await Project.find(configuration, portableCwd);
	return project;
}

async function loadWorkspaceVersions(project: Project): Promise<Map<string, string>> {
	const workspaceVersions = new Map<string, string>();
	for (const workspace of project.workspaces) {
		const { manifest } = workspace;
		if (!manifest.name || !manifest.version) continue;
		workspaceVersions.set(structUtils.stringifyIdent(manifest.name), manifest.version);
	}
	return workspaceVersions;
}

async function loadCatalogs(project: Project): Promise<{
	defaultCatalog: Map<string, string>;
	namedCatalogs: Map<string, Map<string, string>>;
}> {
	const projectCwd = npath.fromPortablePath(project.cwd);
	const yarnRcPath = path.join(projectCwd, '.yarnrc.yml');

	try {
		const fd = await open(yarnRcPath, 'r');
		const yarnRcContent = await fd.readFile('utf8');
		await fd.close();

		const yarnRc = YarnRcSchema.parse(parseYaml(yarnRcContent));
		const defaultCatalog = new Map<string, string>(Object.entries(yarnRc.catalog ?? {}));
		const namedCatalogs = new Map<string, Map<string, string>>(
			Object.entries(yarnRc.catalogs ?? {}).map(([name, entries]) => [
				name,
				new Map(Object.entries(entries)),
			]),
		);

		return { defaultCatalog, namedCatalogs };
	} catch {
		return {
			defaultCatalog: new Map<string, string>(),
			namedCatalogs: new Map<string, Map<string, string>>(),
		};
	}
}
