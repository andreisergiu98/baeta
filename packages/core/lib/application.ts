import { IExecutableSchemaDefinition, makeExecutableSchema } from '@graphql-tools/schema';
import { pruneSchema } from '@graphql-tools/utils';
import { printSchema } from 'graphql';
import { writeFile } from 'node:fs/promises';
import { getModuleBuilder, transformSchema } from '../sdk';
import { addValidationToSchema } from './input-directive/input-schema';

type ExecutableSchemaOptions = Omit<IExecutableSchemaDefinition, 'typeDefs' | 'resolvers'>;

export interface Options {
  modules: Record<string, unknown>[];
  pruneSchema?: boolean;
  printSchema?: boolean | string;
  executableSchemaOptions?: ExecutableSchemaOptions;
}

function makeSchema(
  typeDefs: IExecutableSchemaDefinition['typeDefs'],
  resolvers: IExecutableSchemaDefinition['resolvers'],
  options?: ExecutableSchemaOptions
) {
  try {
    return makeExecutableSchema({
      ...options,
      typeDefs,
      resolvers,
    });
  } catch (e) {
    throw new Error(`Couldn't build schema! Did you forget to register all modules?`, {
      cause: e,
    });
  }
}

export function createApplication(options: Options) {
  const builders = options.modules.map((module) => getModuleBuilder(module));
  const builtModules = builders.map((builder) => builder.build());

  const typeDefs = builtModules.map((b) => b.typedef);
  const resolvers = builtModules.map((b) => b.resolvers);
  const transformers = builtModules.flatMap((b) => b.transform);

  let schema = makeSchema(typeDefs, resolvers, options.executableSchemaOptions);

  schema = transformSchema(schema, transformers);
  schema = addValidationToSchema(schema);

  if (options.pruneSchema) {
    schema = pruneSchema(schema);
  }

  if (options.printSchema) {
    const path = typeof options.printSchema === 'string' ? options.printSchema : 'schema.graphql';
    writeFile(path, printSchema(schema), 'utf-8');
  }

  return {
    schema,
  };
}
