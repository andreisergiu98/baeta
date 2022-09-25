import { GM } from "./graphql-modules";
import { SdkModule } from "../sdk/module";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { pruneSchema } from "@graphql-tools/utils";
import { GraphQLSchema, printSchema } from "graphql";
import fs from "fs/promises";

export interface Options {
  modules: Array<Record<string, unknown>>;
}

function transformSchema(schema: GraphQLSchema, modules: SdkModule<unknown>[]) {
  let rebuiltSchema = schema;

  for (const module of modules) {
    rebuiltSchema = module.__transformSchema(rebuiltSchema);
  }

  return rebuiltSchema;
}

export function createApplication(options: Options) {
  const modules = options.modules as SdkModule<unknown>[];
  const builtModules = modules.map((module) => module.__build());

  const app = GM.createApplication({
    modules: builtModules,
    middlewares: {
      "*": {
        "*": [
          (ctx, next) => {
            return next();
          },
        ],
      },
    },
    schemaBuilder(input) {
      let schema = makeExecutableSchema({
        ...input,
      });
      schema = pruneSchema(schema);
      return transformSchema(schema, modules);
    },
  });

  return {
    schema: app.schema,
    typedef: app.typeDefs,
    createApolloExecutor: app.createApolloExecutor,
    createExecution: app.createExecution,
    createOperationController: app.createOperationController,
    createSubscription: app.createSubscription,
  };
}
