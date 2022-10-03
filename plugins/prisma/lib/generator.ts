import { PrismaPluginOptions } from '..';
import { Store } from './context';
import { createResolversBuilder } from './resolver-builder';
import { createSchemaBuilder } from './schema-builder';
import { visit } from './visitor';

export interface GenerateOptions extends Required<PrismaPluginOptions> {
  modulesDir: string;
}

export async function generate(store: Store, options: GenerateOptions) {
  const schemaBuilder = createSchemaBuilder(store, options);
  const resolversBuilder = createResolversBuilder(store, options);

  await visit(store.dmmf, [
    resolversBuilder.visitor.getVisitor(),
    schemaBuilder.visitor.getVisitor(),
  ]);

  const resolverFiles = resolversBuilder.compose();
  const schemaFiles = schemaBuilder.compose();

  return [...resolverFiles, ...schemaFiles];
}
