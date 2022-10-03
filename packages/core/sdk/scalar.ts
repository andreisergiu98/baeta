import { GraphQLScalarType } from 'graphql';
import { ScalarResolver } from '../lib';
import { ManagerOptions } from '../sdk';

export type OnScalarResolver = (scalar: string, resolver: ScalarResolver) => void;

export function createScalarBuilder(scalar: string, options: ManagerOptions) {
  const builder = (resolver: ScalarResolver) => {
    options.onScalar(scalar, resolver);
  };
  return builder;
}

export function addScalar(
  map: Record<string, unknown>,
  scalar: string,
  resolver: GraphQLScalarType<unknown, unknown>
) {
  if (map[scalar] == null) {
    map[scalar] = {};
  }

  map[scalar] = resolver;
}
