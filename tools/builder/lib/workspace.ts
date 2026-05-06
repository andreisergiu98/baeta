import { open } from 'node:fs/promises';
import path from 'node:path';
import { Configuration, Project, structUtils } from '@yarnpkg/core';
import { npath, ppath } from '@yarnpkg/fslib';
import { parse as parseYaml } from 'yaml';
import z from 'zod';

export async function loadWorkspaceProject(): Promise<Project> {
	const configuration = await Configuration.find(ppath.cwd(), null, {
		strict: false,
	});
	const { project } = await Project.find(configuration, ppath.cwd());
	return project;
}

export interface PublicWorkspacePackage {
	name: string;
	version: string;
	dir: string;
}

export function getPublicWorkspacePackages(project: Project): PublicWorkspacePackage[] {
	const packages: PublicWorkspacePackage[] = [];
	for (const workspace of project.workspaces) {
		if (!workspace.manifest.name) {
			throw new Error(`Workspace at ${workspace.cwd} does not have a name in its manifest`);
		}
		if (workspace.manifest.private === true) {
			continue;
		}
		if (workspace.manifest.version == null) {
			throw new Error(`Workspace at ${workspace.cwd} does not have a version in its manifest`);
		}
		packages.push({
			name: structUtils.stringifyIdent(workspace.manifest.name),
			version: workspace.manifest.version,
			dir: npath.fromPortablePath(workspace.cwd),
		});
	}
	return packages;
}

const YarnRcSchema = z.object({
	catalog: z.record(z.string(), z.string()).optional(),
	catalogs: z.record(z.string(), z.record(z.string(), z.string())).optional(),
});

export async function loadWorkspaceCatalogs(project: Project): Promise<{
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

export async function loadWorkspaceVersionsMap(project: Project): Promise<Map<string, string>> {
	const workspaceVersions = new Map<string, string>();
	for (const workspace of project.workspaces) {
		const { manifest } = workspace;
		if (!manifest.name || !manifest.version) continue;
		workspaceVersions.set(structUtils.stringifyIdent(manifest.name), manifest.version);
	}
	return workspaceVersions;
}

export async function isPackagePublished(name: string, version: string): Promise<boolean> {
	const url = `https://registry.npmjs.org/${encodeURIComponent(name)}/${encodeURIComponent(version)}`;
	const res = await fetch(url);
	if (res.status === 200) return true;
	if (res.status === 404) return false;
	throw new Error(`Unexpected status ${res.status} for ${name}@${version}`);
}
