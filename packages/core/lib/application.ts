import { GM } from "./graphql-modules";
import { SdkModule } from "../sdk/module";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { pruneSchema } from "@graphql-tools/utils";
import { GraphQLSchema } from "graphql";
import { addValidationToSchema } from "./input-validation/input-schema";

export interface Options {
  modules: Array<Record<string, unknown>>;
  pruneSchema?: boolean;
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
    schemaBuilder(input) {
      let schema = makeExecutableSchema({
        ...input,
      });
      if (pruneSchema) {
        schema = pruneSchema(schema);
      }
      schema = transformSchema(schema, modules);
      schema = addValidationToSchema(schema);
      return schema;
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
