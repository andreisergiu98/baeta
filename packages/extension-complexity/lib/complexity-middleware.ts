import type { Middleware } from '@baeta/core';
import type { GraphQLResolveInfo } from 'graphql';
import { calculateComplexity } from './complexity-calculator.ts';
import { ComplexityErrorKind } from './complexity-errors.ts';
import { type ComplexityExtensionOptions, defaultLimits } from './complexity-options.ts';
import type { FieldSettingsMap } from './field-settings.ts';
import { getComplexityStore } from './store.ts';
import { loadComplexityStore } from './store-loader.ts';

export function createComplexityMiddleware<Result, Root, Context, Args, Info>(
	options: Required<ComplexityExtensionOptions<Context>>,
	fieldSettingsMap: FieldSettingsMap,
): Middleware<Result, Root, Context, Args, Info> {
	return async (next, params) => {
		loadComplexityStore(params.ctx, options.limit, defaultLimits);

		const store = await getComplexityStore(params.ctx);

		const limits = store.limits;

		const results = store.cacheComplexity(() => {
			return calculateComplexity(params.ctx, params.info as GraphQLResolveInfo, fieldSettingsMap, {
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

		return next();
	};
}
