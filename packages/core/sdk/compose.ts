import { GraphQLFieldResolver } from 'graphql';
import { lensPath, set, view } from 'ramda';
import { chainFunctions } from '../utils/functions';
import { FieldResolvers, ResolversMap } from './resolver-mapper';

export type ResolversComposition<
  Resolver extends GraphQLFieldResolver<unknown, unknown> = GraphQLFieldResolver<unknown, unknown>
> = (next: Resolver) => Resolver;

export type ResolversComposerMapping = Record<string, ResolversComposition[]>;

function createMatcher(value: string) {
  return (test: string) => {
    if (value === '*') {
      return true;
    }
    return test === value;
  };
}

function resolveRelevantMappings(resolvers: ResolversMap, path: string) {
  const mappings: Array<string[]> = [];

  if (!resolvers) {
    return mappings;
  }

  const [typeNameOrGlob, fieldNameOrGlob, subscriptionOp] = path.split('.');
  const isTypeMatch = createMatcher(typeNameOrGlob);
  const isFieldMatch = createMatcher(fieldNameOrGlob);

  for (const typeName in resolvers) {
    if (!isTypeMatch(typeName)) {
      continue;
    }

    const fieldMap = resolvers[typeName] as FieldResolvers | undefined;

    if (!fieldMap) {
      return [];
    }

    for (const field in fieldMap) {
      if (!isFieldMatch(field) || fieldMap[field] == null) {
        continue;
      }

      const path = [typeName, field];

      let fieldFn: GraphQLFieldResolver<unknown, unknown> | undefined = fieldMap[field];

      if (typeName === 'Subscription') {
        const subMap = fieldMap[field] as unknown as
          | Record<string, GraphQLFieldResolver<unknown, unknown>>
          | undefined;
        fieldFn = subMap?.[subscriptionOp];
        path.push(subscriptionOp);
      }

      if (typeof fieldFn === 'function') {
        mappings.push(path);
      }
    }
  }

  return mappings;
}

export function composeResolvers(
  resolvers: ResolversMap,
  mapping: ResolversComposerMapping = {}
): ResolversMap {
  let mappedResolvers = resolvers;

  for (const key in mapping) {
    const fns = mapping[key];
    const paths = resolveRelevantMappings(resolvers, key);

    for (const path of paths) {
      const lens = lensPath(path);
      const createResolver = chainFunctions([...fns, () => view(lens, mappedResolvers)]);
      mappedResolvers = set(lens, createResolver(), mappedResolvers);
    }
  }

  return mappedResolvers;
}
