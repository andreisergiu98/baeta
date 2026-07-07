import { AggregateGraphQLError, InternalServerError } from '@baeta/errors';
import { GraphQLError } from 'graphql';
import { logger } from './logger.ts';

/** Custom error resolver function for authorization failures. */
export type ScopeErrorResolver = (err: unknown) => unknown;

export function resolveError(err: unknown, resolve: ScopeErrorResolver) {
	const resolvedError = resolve(err);

	if (resolvedError instanceof Error) {
		throw resolvedError;
	}

	throw err;
}

export function defaultErrorResolver(err: unknown): unknown {
	if (err instanceof AggregateError) {
		return aggregateErrorResolver(err);
	}

	if (!isGraphqlError(err)) {
		logger.warn({
			type: 'non-graphql-error',
			message: `Non GraphQLError encountered by auth`,
			extra: { origin: err },
		});
	}

	return err;
}

/**
 * Default error resolver for authorization failures.
 * If multiple authorization errors are encountered they are combined into `AggregateGraphQLError` with proper HTTP status codes.
 */
export function aggregateErrorResolver(err: AggregateError) {
	if (err.errors.length === 1) {
		if (!isGraphqlError(err.errors[0])) {
			logger.warn({
				type: 'non-graphql-error',
				message: `Non GraphQLError encountered by auth`,
				extra: { origin: err },
			});
		}
		return err.errors[0];
	}

	let http: { status?: number } = {};
	const errors: GraphQLError[] = [];

	for (const error of err.errors) {
		if (!isGraphqlError(error)) {
			errors.push(new InternalServerError(error));
			logger.warn({
				type: 'non-graphql-error',
				message: `Non GraphQLError encountered by auth`,
				extra: { origin: err },
			});
			continue;
		}
		errors.push(error);
		if (error.extensions.http && http?.status !== 401) {
			http = error.extensions.http;
		}
	}

	return new AggregateGraphQLError(errors, undefined, {
		extensions: {
			http,
		},
	});
}

function isGraphqlError(err: unknown): err is GraphQLError {
	return err instanceof GraphQLError;
}
