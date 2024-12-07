import { builtinModules } from 'node:module';

const NODE_BUILTIN_NAMESPACE = 'node:';
const NPM_BUILTIN_NAMESPACE = 'npm:';
const BUN_BUILTIN_NAMESPACE = 'bun:';

const nodeBuiltins = builtinModules.filter((id) => !id.includes(':'));

export function isNodeBuiltin(id: string) {
	if (id.startsWith(NODE_BUILTIN_NAMESPACE)) {
		return true;
	}
	return nodeBuiltins.includes(id);
}

export function isBuiltin(id: string) {
	if (process.versions.deno && id.startsWith(NPM_BUILTIN_NAMESPACE)) {
		return true;
	}
	if (process.versions.bun && id.startsWith(BUN_BUILTIN_NAMESPACE)) {
		return true;
	}
	return isNodeBuiltin(id);
}
