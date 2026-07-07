import { createContextStoreWithLoader } from '@baeta/core';
import type { ComplexityLimit } from './complexity-limits.ts';
import { sanitizeLimit } from './sanitize-limit.ts';

export type ComplexityStore<Context> = ReturnType<typeof createComplexityStore<Context>>;

export function createComplexityStore<Context>() {
	const [get, load] = createContextStoreWithLoader(
		Symbol('@baeta/complexity'),
		complexityStoreLoader<Context>,
		{ warnOnDuplicateLoader: false },
	);
	return {
		get,
		load,
	};
}

async function complexityStoreLoader<Context>(
	ctx: Context,
	getLimits:
		| ComplexityLimit
		| ((ctx: Context) => ComplexityLimit | PromiseLike<ComplexityLimit>)
		| undefined,
	defaultLimits: Required<ComplexityLimit>,
) {
	let cache: Required<ComplexityLimit> | undefined;
	const limits = typeof getLimits === 'function' ? await getLimits(ctx) : getLimits;

	const cacheComplexity = (fn: () => Required<ComplexityLimit>) => {
		if (cache) {
			return cache;
		}
		cache = fn();
		return cache;
	};

	return {
		limits: {
			depth: sanitizeLimit(limits?.depth, defaultLimits.depth, 'limit.depth'),
			breadth: sanitizeLimit(limits?.breadth, defaultLimits.breadth, 'limit.breadth'),
			complexity: sanitizeLimit(limits?.complexity, defaultLimits.complexity, 'limit.complexity'),
		},
		cacheComplexity,
	};
}
