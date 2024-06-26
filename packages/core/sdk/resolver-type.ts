import { GraphQLTypeResolver } from 'graphql';
import { TypeResolver } from '../lib';

export type NativeTypeResolver = GraphQLTypeResolver<unknown, unknown>;

export type GenericTypeResolver = TypeResolver<any, any, any>;

export function createTypeResolverAdapter(
  resolver: GenericTypeResolver,
): GraphQLTypeResolver<unknown, unknown> {
  return function adapter(value, ctx, info, type) {
    return resolver({ value, ctx, info, type });
  };
}
