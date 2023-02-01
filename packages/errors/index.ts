import { GraphQLError, GraphQLErrorOptions } from 'graphql';

export enum BaetaErrorCode {
  Unauthenticated = 'UNAUTHENTICATED',
  Forbidden = 'FORBIDDEN',
  BadUserInput = 'BAD_USER_INPUT',
}

export class UnauthenticatedError extends GraphQLError {
  constructor(
    message: string = 'Access denied! You need to be authorized to perform this action!',
    options?: GraphQLErrorOptions
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
    message: string = "Access denied! You don't have permission to perform this action!",
    options?: GraphQLErrorOptions
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
  constructor(message: string = 'Invalid user input!', options?: GraphQLErrorOptions) {
    super(message, {
      ...options,
      extensions: {
        code: BaetaErrorCode.BadUserInput,
        ...options?.extensions,
      },
    });
  }
}
