import type { Steps } from 'github-actions-workflow-builder';
import { type ContextValue } from 'github-actions-workflow-builder/lib/expression';

export type NodeVersion<T = string> = {
	node: T;
	version: T;
};

export function createNodeVersion(version: string): NodeVersion {
	const major = version.split('.')[0];
	return { node: major, version };
}

function conditionalJson<T>(prValue: T, defaultValue: T): T {
	const pr = JSON.stringify(prValue);
	const def = JSON.stringify(defaultValue);
	return `\${{ fromJSON(github.event_name == 'pull_request' && '${pr}' || '${def}') }}` as unknown as T;
}

export type NodeMatrixConfig = {
	node: NodeVersion[];
};

export type NodeMachineMatrixConfig = NodeMatrixConfig & {
	machine: string[];
};

type MatrixOptions = { failFast?: boolean; maxParallel?: number };

export function setNodeBuildMatrix(
	configs: { pr: NodeMatrixConfig; default: NodeMatrixConfig },
	options?: MatrixOptions,
): Steps<ContextValue<{ node: string; version: string }>> {
	return ({ setBuildMatrix }) => {
		return setBuildMatrix(
			{
				node: conditionalJson(
					configs.pr.node.map((v) => v.node),
					configs.default.node.map((v) => v.node),
				),
			},
			{
				...options,
				include: conditionalJson(
					configs.pr.node.map((v) => ({ node: v.node, version: v.version })),
					configs.default.node.map((v) => ({ node: v.node, version: v.version })),
				) as unknown as { node?: string; version?: string }[],
			},
		);
	};
}

export function setNodeBuildMatrixWithMachine(
	configs: { pr: NodeMachineMatrixConfig; default: NodeMachineMatrixConfig },
	options?: MatrixOptions,
): Steps<ContextValue<{ node: string; machine: string; version: string }>> {
	return ({ setBuildMatrix, run }) => {
		return setBuildMatrix(
			{
				node: conditionalJson(
					configs.pr.node.map((v) => v.node),
					configs.default.node.map((v) => v.node),
				),
				machine: conditionalJson(configs.pr.machine, configs.default.machine),
			},
			{
				...options,
				include: conditionalJson(
					configs.pr.node.map((v) => ({ node: v.node, version: v.version })),
					configs.default.node.map((v) => ({ node: v.node, version: v.version })),
				) as unknown as { node?: string; version?: string }[],
			},
		);
	};
}
