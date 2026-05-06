import type { Steps } from 'github-actions-workflow-builder';
import { type ContextValue, fromJSON } from 'github-actions-workflow-builder/lib/expression';

export type NodeVersion<T = string> = {
	node: T;
	version: T;
};

export function createNodeVersion(version: string): NodeVersion {
	const major = version.split('.')[0];
	return {
		node: major,
		version,
	};
}

export function setNodeBuildMatrix(
	versions: NodeVersion[],
	options?: { failFast?: boolean; maxParallel?: number },
): Steps<
	ContextValue<{
		node: string;
		version: string;
	}>
> {
	return ({ setBuildMatrix }) => {
		return setBuildMatrix(
			{
				node: versions.map((v) => v.node),
			},
			{
				...options,
				include: fromJSON(
					JSON.stringify(versions.map((v) => ({ node: v.node, version: v.version }))),
				) as unknown as { node?: string | undefined; version?: string | undefined }[],
			},
		);
	};
}

export function setNodeBuildMatrixWithMachine(
	versions: NodeVersion[],
	machines: string[],
	options?: { failFast?: boolean; maxParallel?: number },
): Steps<
	ContextValue<{
		node: string;
		machine: string;
		version: string;
	}>
> {
	return ({ setBuildMatrix }) => {
		return setBuildMatrix(
			{
				node: versions.map((v) => v.node),
				machine: machines,
			},
			{
				...options,
				include: fromJSON(
					JSON.stringify(versions.map((v) => ({ node: v.node, version: v.version }))),
				) as unknown as { node?: string | undefined; version?: string | undefined }[],
			},
		);
	};
}
