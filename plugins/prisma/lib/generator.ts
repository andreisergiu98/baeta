import { createSchemaBuilder } from "./schema-builder";
import { createResolversBuilder } from "./resolver-builder";
import { visit } from "./visitor";
import { Store } from "./context";
import { PrismaPluginOptions } from "..";
import { writeFile } from "fs/promises";

export interface GenerateOptions extends Required<PrismaPluginOptions> {
  modulesDir: string;
}

export async function generate(store: Store, options: GenerateOptions) {
  writeFile("dmmf.json", JSON.stringify(store.dmmf, null, 2), "utf-8");

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
