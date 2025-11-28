import { GraphQLError, type GraphQLErrorOptions } from 'graphql';

/** Complexity error code */
export const ComplexityErrorCode = 'COMPLEXITY_ERROR';

/**
 * Thrown when a query exceeds the complexity limits.
 */
export class ComplexityError extends GraphQLError {
	constructor(
		message = "Complexity limit exceeded! Please reduce the query's complexity.",
		options?: GraphQLErrorOptions,
	) {
		super(message, {
			...options,
			extensions: {
				code: ComplexityErrorCode,
				...options?.extensions,
			},
		});
	}
}

/**
 * Types of complexity validation errors that can occur during query analysis.
 */
export const ComplexityErrorKind = {
	/** Query exceeds maximum allowed depth */
	Depth: 'DepthExceeded',
	/** Query exceeds maximum allowed breadth (fields per level) */
	Breadth: 'BreadthExceeded',
	/** Query exceeds total complexity score limit */
	Complexity: 'ComplexityExceeded',
};

type ComplexityErrorKind = (typeof ComplexityErrorKind)[keyof typeof ComplexityErrorKind];

/**
 * Function type for creating custom complexity error messages.
 *
 * @param kind - The type of complexity limit that was exceeded
 * @param limits - The maximum allowed value
 * @param results - The actual value that exceeded the limit
 * @returns A GraphQL error with a custom message
 */
export type GetComplexityError = (
	kind: ComplexityErrorKind,
	limits: number,
	results: number,
) => GraphQLError;

export function getDefaultComplexityError(
	kind: ComplexityErrorKind,
	limit: number,
	result: number,
): GraphQLError {
	if (kind === ComplexityErrorKind.Depth) {
		return new ComplexityError(`Depth limit of ${limit} exceeded, got: ${result}`, {
			extensions: {
				kind: ComplexityErrorKind.Depth,
				limit,
				got: result,
			},
		});
	}

	if (kind === ComplexityErrorKind.Breadth) {
		return new ComplexityError(`Breadth limit of ${limit} exceeded, got: ${result}`, {
			extensions: {
				kind: ComplexityErrorKind.Breadth,
				limit,
				got: result,
			},
		});
	}

	if (kind === ComplexityErrorKind.Complexity) {
		return new ComplexityError(`Complexity limit of ${limit} exceeded, got: ${result}`, {
			extensions: {
				kind: ComplexityErrorKind.Complexity,
				limit,
				got: result,
			},
		});
	}

	throw new Error('Unknown complexity error kind');
}
