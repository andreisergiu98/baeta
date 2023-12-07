import { AggregateGraphQLError, InternalServerError } from '@baeta/errors';
import { GraphQLError } from 'graphql';

export type ScopeErrorResolver = (err: unknown) => Error | unknown;

export function resolveError(err: unknown, resolve: ScopeErrorResolver) {
  const resolvedError = resolve(err);
  if (resolvedError) {
    throw resolvedError;
  }
  throw err;
}

export function defaultErrorResolver(err: unknown) {
  if (err instanceof AggregateError) {
    return aggregateErrorResolver(err);
  }
  return err;
}

export function aggregateErrorResolver(err: AggregateError): AggregateGraphQLError {
  if (err.errors.length === 1) {
    return err.errors[0];
  }

  let http: { status?: number } = {};
  const errors: GraphQLError[] = [];

  for (const error of err.errors) {
    if (!(error instanceof GraphQLError)) {
      errors.push(new InternalServerError(error));
      continue;
    }

    errors.push(error);

    if (error.extensions.http && http?.status !== 401) {
      http = error.extensions.http;
    }

    error.extensions.http = undefined;
  }

  return new AggregateGraphQLError(errors, undefined, {
    extensions: {
      http,
    },
  });
}
