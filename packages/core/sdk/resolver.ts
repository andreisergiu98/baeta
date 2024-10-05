import type { GraphQLFieldResolver } from 'graphql';
import type { Resolver } from '../lib/index.ts';

export type NativeResolver = GraphQLFieldResolver<unknown, unknown>;

export type GenericResolver = Resolver<any, any, any, any>;

export function createResolverAdapter(resolver: GenericResolver): NativeResolver {
	return function adapter(root, args, ctx, info) {
		return resolver({ root, args, ctx, info });
	};
}
