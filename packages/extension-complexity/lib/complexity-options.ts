import { type GetComplexityError, getDefaultComplexityError } from './complexity-errors.ts';
import type { GetComplexityLimit } from './complexity-limits.ts';

export interface ComplexityExtensionOptions<Context> {
	limit?: GetComplexityLimit<Context>;
	defaultComplexity?: number;
	defaultListMultiplier?: number;
	complexityError?: GetComplexityError;
}

export const defaultLimits = {
	depth: 10,
	breadth: 50,
	complexity: 1000,
};

export type NormalizedOptions<Context> = Required<ComplexityExtensionOptions<Context>>;

export function normalizeOptions<Context>(
	options: ComplexityExtensionOptions<Context>,
): NormalizedOptions<Context> {
	return {
		limit: options.limit ?? defaultLimits,
		defaultComplexity: options.defaultComplexity ?? 1,
		defaultListMultiplier: options.defaultListMultiplier ?? 10,
		complexityError: options.complexityError ?? getDefaultComplexityError,
	};
}
