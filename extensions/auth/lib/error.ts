import { ForbiddenError, UnauthenticatedError } from '@baeta/errors';
import { GraphQLError } from 'graphql';

export type ScopeErrorResolver = (err: unknown) => Error | unknown;

export function resolveError(err: unknown, resolve: ScopeErrorResolver) {
  const resolvedError = resolve(err);
  if (resolvedError) {
    throw resolvedError;
  }
  throw err;
}

export function aggregateErrorResolver(err: unknown): Error {
  if (!(err instanceof AggregateError)) {
    return err as Error;
  }

  let forbiddenError: ForbiddenError | undefined;
  let graphqlError: GraphQLError | undefined;
  let unauthenticatedError: UnauthenticatedError | undefined;

  for (const error of err.errors) {
    if (error instanceof UnauthenticatedError) {
      unauthenticatedError = error;
      continue;
    }

    if (error instanceof ForbiddenError) {
      forbiddenError = error;
      continue;
    }

    if (error instanceof GraphQLError) {
      graphqlError = error;
      continue;
    }

    // most likely internal server error
    return error;
  }

  if (unauthenticatedError) {
    return unauthenticatedError;
  }

  if (forbiddenError) {
    return forbiddenError;
  }

  if (graphqlError) {
    return graphqlError;
  }

  return err;
}
