import { isDevelopmentMode } from '@baeta/util-env';
import { GraphQLError, GraphQLErrorOptions } from 'graphql';

const isDev = isDevelopmentMode();

export enum BaetaErrorCode {
  Unauthenticated = 'UNAUTHENTICATED',
  Forbidden = 'FORBIDDEN',
  BadUserInput = 'BAD_USER_INPUT',
  AggregateError = 'AGGREGATE_ERROR',
  InternalServerError = 'INTERNAL_SERVER_ERROR',
}

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
