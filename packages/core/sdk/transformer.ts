import { GraphQLSchema } from 'graphql';

export type SchemaTransformer = (schema: GraphQLSchema) => GraphQLSchema;

export function transformSchema(schema: GraphQLSchema, transformers: SchemaTransformer[]) {
  return transformers.reduce((acc, transformer) => transformer(acc), schema);
}
