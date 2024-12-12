import { type GetComplexityError, getDefaultComplexityError } from './complexity-errors.ts';
import type { GetComplexityLimit } from './complexity-limits.ts';

/**
 * Configuration options for the complexity extension.
 */
export interface ComplexityExtensionOptions<Context> {
	/** Static limits or function to determine limits based on context */
	limit?: GetComplexityLimit<Context>;
	/**
	 * Base complexity score for fields
	 * @defaultValue 1
	 */
	defaultComplexity?: number;
	/**
	 * Multiplier applied to list fields
	 * @defaultValue 10
	 */
	defaultListMultiplier?: number;
	/** Custom error message generator */
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
