import { GraphQLSchema } from 'graphql';

export type SchemaTransformer = (schema: GraphQLSchema) => GraphQLSchema;
export type OnDirective = (transformer: SchemaTransformer) => void;

export function transformSchema(
  schema: GraphQLSchema,
  transformers: SchemaTransformer[]
) {
  let newSchema = schema;

  for (const transformer of transformers) {
    newSchema = transformer(newSchema);
  }

  return newSchema;
}
