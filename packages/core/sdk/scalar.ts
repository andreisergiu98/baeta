import { GraphQLScalarType } from "graphql";
import { ScalarResolver } from "../lib";
import { ManagerOptions } from "../sdk";

export type OnScalarResolver = (
  scalar: string,
  resolver: ScalarResolver
) => void;

export function createScalarRegisterer(
  scalar: string,
  options: ManagerOptions
) {
  const handler = (resolver: ScalarResolver) => {
    options.onScalar(scalar, resolver);
  };
  return handler;
}

export function registerScalar(
  map: Record<string, unknown>,
  scalar: string,
  resolver: GraphQLScalarType<unknown, unknown>
) {
  if (map[scalar] == null) {
    map[scalar] = {};
  }

  map[scalar] = resolver;
}
