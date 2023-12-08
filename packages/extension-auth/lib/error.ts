import { AggregateGraphQLError, InternalServerError } from '@baeta/errors';
import { log } from '@baeta/util-log';
import { GraphQLError } from 'graphql';

export type ScopeErrorResolver = (err: unknown, path: string) => Error | unknown;

export function resolveError(err: unknown, resolve: ScopeErrorResolver, path: string) {
  const resolvedError = resolve(err, path);

  if (resolvedError) {
    throw resolvedError;
  }

  throw err;
}

export function defaultErrorResolver(err: unknown, path: string) {
  if (err instanceof AggregateError) {
    return aggregateErrorResolver(err, path);
  }

  if (!isGraphqlError(err)) {
    log.warn(`Non GraphQLError encountered by auth at path: ${path}`, err);
  }

  return err;
}

export function aggregateErrorResolver(err: AggregateError, path: string) {
  if (err.errors.length === 1) {
    if (!isGraphqlError(err.errors[0])) {
      log.warn(`Non GraphQLError encountered by auth at path: ${path}`, err);
    }
    return err.errors[0];
  }

  let http: { status?: number } = {};
  const errors: GraphQLError[] = [];

  for (const error of err.errors) {
    if (!isGraphqlError(error)) {
      errors.push(new InternalServerError(error));
      log.warn(`Non GraphQLError encountered by auth at path: ${path}`, err);
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

function isGraphqlError(err: unknown): err is GraphQLError {
  return err instanceof GraphQLError;
}
