import {
  createPluginV1,
  File,
  getModuleGetName,
  getModuleVariableName,
} from '@baeta/generator-sdk';
import { join, parse } from 'path';

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
  moduleName?: string;
  createExport?: boolean;
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
  return types.join('\n\n') + '\n';
}

function printPageInfo(addFields: string[] = []) {
  return printType('PageInfo', [
    ...addFields,
    'hasPreviousPage: Boolean!',
    'hasNextPage: Boolean!',
  ]);
}

function printExport(moduleDefinitionName: string, moduleName: string) {
  const parsed = parse(moduleDefinitionName);
  const method = getModuleGetName(moduleName);
  const importName = parsed.ext === '.ts' ? parsed.name : moduleDefinitionName;

  return `import { ${method} } from "./${importName}";

export const ${getModuleVariableName(moduleName)} = ${method}();
`;
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

function createConnectionModuleDir(modulesDir: string, moduleName: string) {
  return join(modulesDir, moduleName);
}

function createGqlFilename(moduleDir: string) {
  return `${moduleDir}/connections.gql`;
}

function createExportFilename(moduleDir: string) {
  return `${moduleDir}/index.ts`;
}

export function paginationPlugin(options: PaginationOptions) {
  const { moduleName = 'baeta-pagination' } = options;

  return createPluginV1({
    name: 'pagination',
    actionName: 'pagination connections',
    watch: (generatorOptions, watcher) => {
      watcher.ignore(`${createConnectionModuleDir(generatorOptions.modulesDir, moduleName)}/**`);
    },
    generate: async (ctx, next) => {
      const types: string[] = [printPageInfo(options.pageInfoFields)];

      for (const name in options.types) {
        const typeOptions = options.types[name];

        if (typeOptions === false) {
          continue;
        }

        const connectionTypes = printConnectionTypes(
          name,
          typeOptions === true ? {} : typeOptions,
          options
        );

        types.push(...connectionTypes);
      }

      const moduleDir = createConnectionModuleDir(ctx.generatorOptions.modulesDir, moduleName);

      const definitionFile = new File(createGqlFilename(moduleDir), printTypes(types), 'schema');

      await definitionFile.write();

      ctx.fileManager.add(definitionFile);

      if (options.createExport === false) {
        return next();
      }

      const exportFile = new File(
        createExportFilename(moduleDir),
        printExport(ctx.generatorOptions.moduleDefinitionName, moduleName),
        'export'
      );

      ctx.fileManager.add(exportFile);

      return next();
    },
  });
}
