import { mergeTypeDefs } from '@graphql-tools/merge';
import { IExecutableSchemaDefinition, makeExecutableSchema } from '@graphql-tools/schema';
import { pruneSchema } from '@graphql-tools/utils';
import { printSchema } from 'graphql';
import { writeFile } from 'node:fs/promises';
import { getModuleBuilder, transformSchema } from '../sdk';
import { addValidationToSchema } from './input-directive/input-schema';

export interface Options {
  modules: Record<string, unknown>[];
  pruneSchema?: boolean;
  printSchema?: boolean | string;
  executableSchemaOptions?: Omit<IExecutableSchemaDefinition, 'typeDefs' | 'resolvers'>;
}

export function createApplication(options: Options) {
  const builders = options.modules.map((module) => getModuleBuilder(module));
  const builtModules = builders.map((builder) => builder.build());

  const typeDefs = builtModules.map((b) => b.typedef);
  const resolvers = builtModules.map((b) => b.resolvers).flat();
  const transformers = builtModules.map((b) => b.transform).flat();

  let schema = makeExecutableSchema({
    ...options.executableSchemaOptions,
    typeDefs: mergeTypeDefs(typeDefs),
    resolvers,
  });

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
