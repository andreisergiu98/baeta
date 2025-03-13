import type { NativeMiddleware } from '@baeta/core/sdk';
import { calculateComplexity } from './complexity-calculator.ts';
import { ComplexityErrorKind } from './complexity-errors.ts';
import { type ComplexityExtensionOptions, defaultLimits } from './complexity-options.ts';
import type { FieldSettingsMap } from './field-settings.ts';
import { loadComplexityStore } from './store-loader.ts';
import { getComplexityStore } from './store.ts';

export function createComplexityMiddleware<Result, Root, Context, Args>(
	options: Required<ComplexityExtensionOptions<Context>>,
	fieldSettingsMap: FieldSettingsMap,
): NativeMiddleware<Result, Root, Context, Args> {
	return (next) => async (root, args, ctx, info) => {
		loadComplexityStore(ctx, options.limit, defaultLimits);

		const store = await getComplexityStore(ctx);

		const limits = store.limits;

		const results = store.cacheComplexity(() => {
			return calculateComplexity(ctx, info, fieldSettingsMap, {
				complexity: options.defaultComplexity,
				multiplier: options.defaultListMultiplier,
			});
		});

		if (results.complexity > limits.complexity) {
			throw options.complexityError(
				ComplexityErrorKind.Complexity,
				limits.complexity,
				results.complexity,
			);
		}

		if (results.depth > limits.depth) {
			throw options.complexityError(ComplexityErrorKind.Depth, limits.depth, results.depth);
		}

		if (results.breadth > limits.breadth) {
			throw options.complexityError(ComplexityErrorKind.Breadth, limits.breadth, results.breadth);
		}

		return next(root, args, ctx, info);
	};
}
