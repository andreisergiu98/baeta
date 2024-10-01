import { createHash } from 'node:crypto';
import { getCachedDocumentNodeFromSchema } from '@graphql-codegen/plugin-helpers';
import { GraphQLSchema, print } from 'graphql';

export function hashContent(content: string): string {
  return createHash('sha256').update(content).digest('hex');
}

export function hashSchema(schema: GraphQLSchema): string {
  return hashContent(print(getCachedDocumentNodeFromSchema(schema)));
}
