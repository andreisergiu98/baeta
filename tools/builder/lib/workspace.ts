import { open } from 'node:fs/promises';
import path from 'node:path';
import { Configuration, Project, structUtils, type Workspace } from '@yarnpkg/core';
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
	for (const workspace of topologicalSort(project.workspaces)) {
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

function topologicalSort(workspaces: Workspace[]): Workspace[] {
	const targetSet = new Set(workspaces);
	const nameToWorkspace = new Map<string, Workspace>();

	for (const ws of workspaces) {
		if (ws.manifest.name) {
			nameToWorkspace.set(structUtils.stringifyIdent(ws.manifest.name), ws);
		}
	}

	const remaining = new Map<Workspace, Set<Workspace>>();
	for (const workspace of workspaces) {
		const deps = new Set<Workspace>();
		const allDeps = [
			...workspace.manifest.dependencies.values(),
			...workspace.manifest.peerDependencies.values(),
		];
		for (const dep of allDeps) {
			const depWorkspace = nameToWorkspace.get(structUtils.stringifyIdent(dep));
			if (depWorkspace && targetSet.has(depWorkspace)) {
				deps.add(depWorkspace);
			}
		}
		remaining.set(workspace, deps);
	}

	const sorted: Workspace[] = [];
	while (remaining.size > 0) {
		const ready = [...remaining.entries()].filter(([_, deps]) => deps.size === 0).map(([ws]) => ws);
		if (ready.length === 0) {
			throw new Error('Circular dependency detected in publish set');
		}
		for (const workspace of ready) {
			sorted.push(workspace);
			remaining.delete(workspace);
		}
		for (const deps of remaining.values()) {
			for (const workspace of ready) {
				deps.delete(workspace);
			}
		}
	}

	const isCreateBaeta = (workspace: Workspace) => {
		return (
			workspace.manifest.name &&
			structUtils.stringifyIdent(workspace.manifest.name) === 'create-baeta'
		);
	};

	const createBaetaWorkspace = sorted.find(isCreateBaeta);
	if (!createBaetaWorkspace) return sorted;

	return [...sorted.filter((ws) => ws !== createBaetaWorkspace), createBaetaWorkspace];
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
