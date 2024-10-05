import type { Extension } from '../sdk/index.ts';

export function createExtensions(...extensions: Array<() => Extension>) {
	return extensions;
}
