import { IResolvers } from '@graphql-tools/utils';
import { GraphQLFieldResolver } from 'graphql';
import { createObjectLens } from '../utils/object';
import { ResolversMap } from './resolver-mapper';

export type ResolversComposition<
  Resolver extends GraphQLFieldResolver<unknown, unknown> = GraphQLFieldResolver<unknown, unknown>
> = (next: Resolver) => Resolver;

export type ResolversComposerMapping = Record<string, ResolversComposition[]>;

export function composeResolvers(resolvers: ResolversMap, mapping: ResolversComposerMapping = {}) {
  for (const key in mapping) {
    const fns = mapping[key];
    const path = key.split('.');

    const lens = createObjectLens(resolvers, path);
    const createResolver = chainResolvers([...fns, () => lens.get()]);
    lens.set(createResolver());
  }

  return resolvers as IResolvers;
}

function chainResolvers(funcs: Function[]) {
  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => {
    return (...args: unknown[]) => a(b(...args));
  });
}
