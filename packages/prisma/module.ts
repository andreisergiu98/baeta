import type { ScalarResolver } from "@baeta/core";
import { GraphQLSchema } from "graphql";
import { registerDirectives } from "./directives";
import { registerScalars } from "./scalars";

export interface ModuleRegisterer {
  Scalar: {
    DateTime: (resolver: ScalarResolver) => void;
    BigInt: (resolver: ScalarResolver) => void;
    Json: (resolver: ScalarResolver) => void;
    Decimal: (resolver: ScalarResolver) => void;
    Bytes: (resolver: ScalarResolver) => void;
  };
  $directive: (directive: (schema: GraphQLSchema) => GraphQLSchema) => void;
}

export function registerPrismaModule(module: ModuleRegisterer) {
  registerScalars(module);
  registerDirectives(module);
}
