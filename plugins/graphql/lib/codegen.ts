import { GraphqlPluginOptions } from '@baeta/config';
import { File } from '@baeta/plugin';
import { codegen as gqlCodegen } from '@graphql-codegen/core';
import { normalizeConfig, normalizeInstanceOrArray } from '@graphql-codegen/plugin-helpers';
import * as typescriptPlugin from '@graphql-codegen/typescript';
import { UnnormalizedTypeDefPointer } from '@graphql-tools/load';
import path from 'path';
import * as contextPlugin from '../context';
import * as modules from '../modules';
import * as typescriptResolversPlugin from '../resolvers';
import { createCache } from '../utils/cache';
import { loadSchema } from '../utils/load';

export async function generate(options: GraphqlPluginOptions) {
  const root = process.cwd();
  const modulesDir = path.relative(root, options.modulesDir || 'modules');

  const rootConfig = {
    schemas: normalizeInstanceOrArray(options.schemas),
    modulesDir,
    baseTypesPath: path.relative(modulesDir, options.baseTypesPath || './__generated__/types.ts'),
    contextType: options.contextType,
    moduleDefinitionName: options.moduleDefinitionName || 'typedef.ts',
    scalars: options.scalars,
    plugins: normalizeConfig(['typescript', 'context']),
    pluginMap: {
      typescript: typescriptPlugin,
      context: contextPlugin,
      'typescript-resolvers': typescriptResolversPlugin,
    },
  };

  const cache = createCache();

  const schemaPointerMap: UnnormalizedTypeDefPointer = {};
  for (const ptr of rootConfig.schemas) {
    if (typeof ptr === 'string') {
      schemaPointerMap[ptr] = {};
    } else if (typeof ptr === 'object') {
      Object.assign(schemaPointerMap, ptr);
    }
  }

  const hash = JSON.stringify(schemaPointerMap);
  const result = await cache('schema', hash, async () => {
    return loadSchema(schemaPointerMap, root);
  });

  const outputs = await modules.preset.buildGeneratesSection({
    baseOutputDir: modulesDir,
    presetConfig: {
      baseTypesPath: rootConfig.baseTypesPath,
      filename: rootConfig.moduleDefinitionName,
      encapsulateModuleTypes: 'none',
    },
    schema: result.outputSchema,
    schemaAst: result.outputSchemaAst,
    documents: [],
    pluginMap: rootConfig.pluginMap,
    plugins: rootConfig.plugins,
    config: {
      inputMaybeValue: 'T | undefined',
      contextType: rootConfig.contextType,
      useTypeImports: true,
      federation: true,
      scalars: {
        BigInt: 'number',
        Bytes: 'Buffer',
        DateTime: 'Date',
        Decimal: 'number',
        Json: '{}',
        ...rootConfig.scalars,
      },
    },
  });

  const promises = outputs.map(async (output) => {
    const result = await gqlCodegen({
      ...output,
      cache,
    });
    return new File(output.filename, result, 'graphql');
  });

  return Promise.all(promises);
}
