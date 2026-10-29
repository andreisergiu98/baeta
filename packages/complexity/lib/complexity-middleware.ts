import type { Middleware, MiddlewareParams } from '@baeta/core';
import { mapMaybePromise } from '@baeta/promises';
import type { GraphQLResolveInfo } from 'graphql';
import { calculateComplexity } from './complexity-calculator.ts';
import { ComplexityErrorKind } from './complexity-errors.ts';
import { type ComplexityExtensionOptions, defaultLimits } from './complexity-options.ts';
import { type ComplexityStore, type ComplexityStoreValue } from './complexity-store.ts';
import type { FieldSettingsMap } from './field-settings.ts';

export function createComplexityMiddleware<Result, Root, Context, Args, Info>(
	options: Required<ComplexityExtensionOptions<Context>>,
	fieldSettingsMap: FieldSettingsMap,
	complexityStore: ComplexityStore<Context>,
): Middleware<Result, Root, Context, Args, Info> {
	const checkLimits = (
		{ limits, cacheComplexity }: ComplexityStoreValue,
		params: MiddlewareParams<Root, Context, Args, Info>,
	) => {
		const results = cacheComplexity(() => {
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
	};

	return (next, params) => {
		complexityStore.load(params.ctx, options.limit, defaultLimits);

		return mapMaybePromise(complexityStore.getMaybeSync(params.ctx), (store) => {
			checkLimits(store, params);
			return next();
		});
	};
}
