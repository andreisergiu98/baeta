import type { ComplexityLimit } from './complexity-limits.ts';
import { setComplexityStoreLoader } from './store.ts';

export function loadComplexityStore<T>(
	ctx: T,
	getLimits: ComplexityLimit | ((ctx: T) => ComplexityLimit | Promise<ComplexityLimit>) | undefined,
	defaultLimits: Required<ComplexityLimit>,
) {
	setComplexityStoreLoader(ctx, async () => {
		const limits = typeof getLimits === 'function' ? await getLimits(ctx) : getLimits;

		let cache: Required<ComplexityLimit> | undefined = undefined;

		const cacheComplexity = (fn: () => Required<ComplexityLimit>) => {
			if (cache) {
				return cache;
			}

			cache = fn();
			return cache;
		};

		return {
			limits: {
				depth: limits?.depth ?? defaultLimits.depth,
				breadth: limits?.breadth ?? defaultLimits.breadth,
				complexity: limits?.complexity ?? defaultLimits.complexity,
			},
			cacheComplexity,
		};
	});
}
