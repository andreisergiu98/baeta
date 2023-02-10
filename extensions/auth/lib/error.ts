import { AggregateGraphQLError } from '@baeta/errors';
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

  if (err.errors.length === 1) {
    return err.errors[1];
  }

  let http: { status?: number } = {};
  const errors: GraphQLError[] = [];

  for (const error of err.errors) {
    if (!(error instanceof GraphQLError)) {
      continue;
    }

    errors.push(error);

    if (error.extensions.http && http?.status !== 401) {
      http = error.extensions.http;
      error.extensions.http = undefined;
    }
  }

  return new AggregateGraphQLError(err.errors, undefined, {
    extensions: {
      http,
    },
  });
}
