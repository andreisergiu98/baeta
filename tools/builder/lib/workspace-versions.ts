import { Configuration, Project, structUtils } from '@yarnpkg/core';
import { npath, ppath } from '@yarnpkg/fslib';
import { readFile, stat } from 'fs/promises';
import path from 'path';
import { parse as parseYaml } from 'yaml';
import z from 'zod';

const YarnRcSchema = z.object({
	catalog: z.record(z.string(), z.string()).optional(),
	catalogs: z.record(z.string(), z.record(z.string(), z.string())).optional(),
});

export async function getWorkspaceVersions() {
	const project = await loadProject(process.cwd());
	const workspaceVersions = await loadWorkspaceVersions(project);
	const { defaultCatalog, namedCatalogs } = await loadCatalogs(project);

	return {
		workspaceVersions,
		defaultCatalog,
		namedCatalogs,
	};
}

export function isWorkspaceSpecifier(specifier: string): specifier is `workspace:${string}` {
	return specifier.startsWith('workspace:');
}

export function isCatalogSpecifier(specifier: string): specifier is `catalog:${string}` {
	return specifier.startsWith('catalog:');
}

export function resolveWorkspaceSpecifier(
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

export function resolveCatalogSpecifier(
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

	const exists = await stat(yarnRcPath)
		.then((stat) => stat.isFile())
		.catch(() => false);

	if (!exists) {
		return {
			defaultCatalog: new Map<string, string>(),
			namedCatalogs: new Map<string, Map<string, string>>(),
		};
	}

	const yarnRcContent = await readFile(yarnRcPath, 'utf8');
	const yarnRc = YarnRcSchema.parse(parseYaml(yarnRcContent));

	const defaultCatalog = new Map<string, string>(Object.entries(yarnRc.catalog ?? {}));
	const namedCatalogs = new Map<string, Map<string, string>>(
		Object.entries(yarnRc.catalogs ?? {}).map(([name, entries]) => [
			name,
			new Map(Object.entries(entries)),
		]),
	);

	return { defaultCatalog, namedCatalogs };
}
