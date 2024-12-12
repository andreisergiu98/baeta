import { isDevelopmentMode } from '@baeta/util-env';
import { GraphQLError, type GraphQLErrorOptions } from 'graphql';

const isDev = isDevelopmentMode();

/**
 * Standard error codes used across the Baeta framework.
 */
export enum BaetaErrorCode {
	/** Authentication is required but was not provided */
	Unauthenticated = 'UNAUTHENTICATED',
	/** User is authenticated but lacks required permissions */
	Forbidden = 'FORBIDDEN',
	/** Invalid input provided by the user */
	BadUserInput = 'BAD_USER_INPUT',
	/** Unexpected server-side error */
	InternalServerError = 'INTERNAL_SERVER_ERROR',
	/** Multiple errors occurred simultaneously */
	AggregateError = 'AGGREGATE_ERROR',
}

/**
 * Thrown when a user attempts to access a resource without authentication.
 * Results in a 401 HTTP status code.
 */
export class UnauthenticatedError extends GraphQLError {
	constructor(
		message = 'Access denied! You need to be authenticated to perform this action!',
		options?: GraphQLErrorOptions,
	) {
		super(message, {
			...options,
			extensions: {
				code: BaetaErrorCode.Unauthenticated,
				http: {
					status: 401,
				},
				...options?.extensions,
			},
		});
	}
}

/**
 * Thrown when an authenticated user lacks the required permissions.
 */
export class ForbiddenError extends GraphQLError {
	constructor(
		message = "Access denied! You don't have permission to perform this action!",
		options?: GraphQLErrorOptions,
	) {
		super(message, {
			...options,
			extensions: {
				code: BaetaErrorCode.Forbidden,
				...options?.extensions,
			},
		});
	}
}

/**
 * Thrown when the user provides invalid input data.
 */
export class BadUserInput extends GraphQLError {
	constructor(message = 'Invalid user input!', options?: GraphQLErrorOptions) {
		super(message, {
			...options,
			extensions: {
				code: BaetaErrorCode.BadUserInput,
				...options?.extensions,
			},
		});
	}
}

/**
 * Thrown when an unexpected server-side error occurs.
 * In development mode, includes the original error message and stack trace.
 * In production, shows a generic error message.
 */
export class InternalServerError extends GraphQLError {
	constructor(err: Error, message = 'Internal server error!', options?: GraphQLErrorOptions) {
		super(isDev ? err.message : message, {
			...options,
			originalError: isDev ? err : undefined,
			extensions: {
				code: BaetaErrorCode.InternalServerError,
				...options?.extensions,
			},
		});
	}
}

function getStackTrace(err: Error) {
	if (err instanceof GraphQLError) {
		return err.originalError?.stack ?? err.stack;
	}
	return err.stack;
}

/**
 * Represents multiple GraphQL errors that occurred simultaneously.
 * Useful for batch operations where multiple errors need to be reported.
 */
export class AggregateGraphQLError extends GraphQLError {
	constructor(
		errors: GraphQLError[],
		message = 'Multiple errors encountered',
		options?: GraphQLErrorOptions,
	) {
		super(message, {
			...options,
			extensions: {
				...options?.extensions,
				code: BaetaErrorCode.AggregateError,
				errors: errors.map((err) => ({
					message: err.message,
					path: err.path,
					locations: err.locations,
					extensions: err.extensions,
					stacktrace: isDev ? getStackTrace(err) : undefined,
				})),
			},
		});
	}
}
