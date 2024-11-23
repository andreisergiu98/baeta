import { ValidationError } from '@baeta/errors';
import type { GraphQLError } from 'graphql';

export enum ComplexityErrorKind {
	Depth = 'DepthExceeded',
	Breadth = 'BreadthExceeded',
	Complexity = 'ComplexityExceeded',
}

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
