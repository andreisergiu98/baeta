import { GraphQLFieldResolver } from 'graphql';
import { Resolver } from '../lib';

export type NativeResolver = GraphQLFieldResolver<unknown, unknown>;
// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export type GenericResolver = Resolver<any, any, any, any>;

export function createResolverAdapter(resolver: GenericResolver): NativeResolver {
  return function adapter(root, args, ctx, info) {
    return resolver({ root, args, ctx, info });
  };
}
