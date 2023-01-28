import { createPluginV1, File } from '@baeta/generator-sdk';

interface TypeOptions {
  nodeType?: string;
  cursorType?: string;
  edgeFields?: string[];
  connectionFields?: string[];
}

interface PaginationOptions {
  types: Record<string, boolean | TypeOptions>;
  nullableNode?: boolean;
  pageInfoFields?: string[];
}

function printFields(fields: string[]) {
  return fields.map((field) => `  ${field}`).join('\n');
}

function printType(name: string, fields: string[]) {
  return `type ${name} {
${printFields(fields)}
}`;
}

function printTypes(types: string[]) {
  return types.join('\n\n');
}

function printPageInfo(addFields: string[] = []) {
  return printType('PageInfo', [
    ...addFields,
    'hasPreviousPage: Boolean!',
    'hasNextPage: Boolean!',
  ]);
}

function printExport(moduleDefinitionName: string) {
  return `import { getConnectionsModule } from "./${moduleDefinitionName}";

export const connectionsModule = getConnectionsModule()`;
}

function printConnectionTypes(name: string, typeOptions: TypeOptions, options: PaginationOptions) {
  const {
    cursorType = 'String!',
    nodeType = name,
    connectionFields = [],
    edgeFields = [],
  } = typeOptions;

  const connection = printType(`${name}Connection`, [
    ...connectionFields,
    'pageInfo: PageInfo!',
    `edges: [${name}Edge]`,
  ]);

  const edge = printType(`${name}Edge`, [
    ...edgeFields,
    `cursor: ${cursorType}`,
    `node: ${nodeType}${options.nullableNode === false ? '!' : ''}`,
  ]);

  return [connection, edge];
}

export function paginationPlugin(options: PaginationOptions) {
  return createPluginV1({
    name: 'pagination',
    actionName: 'pagination connections',
    generate: async (ctx, next) => {
      const types: string[] = [printPageInfo(options.pageInfoFields)];

      for (const name in options.types) {
        const typeOptions = options.types[name];

        if (typeOptions === false) {
          continue;
        }

        types.push(...printConnectionTypes(name, typeOptions === true ? {} : typeOptions, options));
      }

      const definitionFile = new File(
        'src/modules/connections/connections.gql',
        printTypes(types),
        'pagination'
      );

      const exportFile = new File(
        'src/modules/connections/index.ts',
        printExport(ctx.generatorOptions.moduleDefinitionName || 'typedef'),
        'pagination'
      );

      await definitionFile.write();
      ctx.fileManager.add(definitionFile, exportFile);

      return next();
    },
  });
}
