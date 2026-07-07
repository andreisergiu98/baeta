import { logger } from './logger.ts';

export function createGrantCache() {
	const cache = new WeakMap<object, Set<string>>();
	return {
		getGrants: (result: unknown) => {
			if (!isValidTarget(result)) return;
			return cache.get(result);
		},
		addGrants: (result: unknown, values: string[]) => {
			if (!isValidTarget(result)) {
				logger.warn({
					type: 'invalid-grant-target',
					message: `Attempted to add grants for a non-object result. Grants will not be saved.`,
					extra: { stack: new Error().stack },
				});
				return;
			}
			const existing = cache.get(result) ?? new Set<string>();
			values.forEach((grant) => existing.add(grant));
			cache.set(result, existing);
		},
	};
}

function isValidTarget(target: unknown): target is object {
	return typeof target === 'object' && target !== null;
}

export type GrantCache = ReturnType<typeof createGrantCache>;
