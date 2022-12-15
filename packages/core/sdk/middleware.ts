import { GraphQLFieldResolver } from 'graphql';
import { Middleware } from '../lib';

export type NativeMiddleware = (
  next: GraphQLFieldResolver<{}, {}, {}, Promise<{}>>
) => GraphQLFieldResolver<{}, {}>;

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export type GenericMiddleware = Middleware<any, any, any, any>;

export function createMiddlewareAdapter(
  middleware: Middleware<unknown, unknown, unknown, unknown>
): NativeMiddleware {
  return (nextResolver) => {
    return function adapter(root, args, ctx, info) {
      const next = () => nextResolver(root, args, ctx, info);
      return middleware({ root, args, info, ctx }, next);
    };
  };
}
