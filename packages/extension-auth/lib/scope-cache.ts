import stringify from 'fast-json-stable-stringify';

export function createScopeCache() {
	const cache: Record<string, undefined | boolean | Promise<boolean>> = {};

	return {
		createKey: (name: string, params: unknown) => {
			return `scope:${name}:${stringify(params)}`;
		},
		getScopeValue: (key: string) => {
			return cache[key];
		},
		setScopeValue: (key: string, value: boolean | Promise<boolean>) => {
			cache[key] = value;
		},
	};
}

export type ScopeCache = ReturnType<typeof createScopeCache>;
