import { GraphQLError, GraphQLErrorOptions } from 'graphql';

export enum BaetaErrorCode {
  Unauthenticated = 'UNAUTHENTICATED',
  Forbidden = 'FORBIDDEN',
  BadUserInput = 'BAD_USER_INPUT',
  AggregateError = 'AGGREGATE_ERROR',
}

export class UnauthenticatedError extends GraphQLError {
  constructor(
    message = 'Access denied! You need to be authorized to perform this action!',
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
        errors: errors.map((error) => ({
          message: error.message,
          path: error.path,
          locations: error.locations,
          extensions: error.extensions,
          // stacktrace: process.env.NODE_ENV === 'production' ? undefined : error.stack,
        })),
      },
    });
  }
}
