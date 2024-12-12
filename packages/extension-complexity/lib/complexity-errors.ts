import { ValidationError } from '@baeta/errors';
import type { GraphQLError } from 'graphql';

/**
 * Types of complexity validation errors that can occur during query analysis.
 */
export enum ComplexityErrorKind {
	/** Query exceeds maximum allowed depth */
	Depth = 'DepthExceeded',
	/** Query exceeds maximum allowed breadth (fields per level) */
	Breadth = 'BreadthExceeded',
	/** Query exceeds total complexity score limit */
	Complexity = 'ComplexityExceeded',
}

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
		return new ValidationError(`Depth limit of ${limit} exceeded, got: ${result}`);
	}

	if (kind === ComplexityErrorKind.Breadth) {
		return new ValidationError(`Breadth limit of ${limit} exceeded, got: ${result}`);
	}

	if (kind === ComplexityErrorKind.Complexity) {
		return new ValidationError(`Complexity limit of ${limit} exceeded, got: ${result}`);
	}

	throw new Error('Unknown complexity error kind');
}
