import type { ComplexityLimit } from './complexity-limits.ts';
import { sanitizeLimit } from './sanitize-limit.ts';
import { setComplexityStoreLoader } from './store.ts';

export function loadComplexityStore<T>(
	ctx: T,
	getLimits:
		| ComplexityLimit
		| ((ctx: T) => ComplexityLimit | PromiseLike<ComplexityLimit>)
		| undefined,
	defaultLimits: Required<ComplexityLimit>,
) {
	setComplexityStoreLoader(ctx, async () => {
		const limits = typeof getLimits === 'function' ? await getLimits(ctx) : getLimits;

		let cache: Required<ComplexityLimit> | undefined;

		const cacheComplexity = (fn: () => Required<ComplexityLimit>) => {
			if (cache) {
				return cache;
			}

			cache = fn();
			return cache;
		};

		return {
			limits: {
				depth: sanitizeLimit(limits?.depth, defaultLimits.depth),
				breadth: sanitizeLimit(limits?.breadth, defaultLimits.breadth),
				complexity: sanitizeLimit(limits?.complexity, defaultLimits.complexity),
			},
			cacheComplexity,
		};
	});
}
