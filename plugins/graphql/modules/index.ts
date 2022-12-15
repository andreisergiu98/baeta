import { Types } from '@graphql-codegen/plugin-helpers';
import { BaseVisitor, getConfigValue } from '@graphql-codegen/visitor-plugin-common';
import { Source } from '@graphql-tools/utils';
import { concatAST, DocumentNode, isScalarType } from 'graphql';
import { join, relative, resolve } from 'path';
import { buildModule } from './builder';
import { ModulesConfig } from './config';
import {
  collectObjectFieldTypesAndArguments,
  groupSourcesByModule,
  isGraphQLPrimitive,
  normalize,
  stripFilename,
} from './utils';

export const preset: Types.OutputPreset<ModulesConfig> = {
  buildGeneratesSection: (options) => {
    const { baseOutputDir } = options;
    const { baseTypesPath, encapsulateModuleTypes } = options.presetConfig;

    const requireRootResolvers = getConfigValue(options?.presetConfig.requireRootResolvers, false);

    const cwd = resolve(options.presetConfig.cwd || process.cwd());
    const importTypesNamespace = options.presetConfig.importTypesNamespace || 'Types';

    if (!baseTypesPath) {
      throw new Error(
        `Preset "graphql-modules" requires you to specify "baseTypesPath" configuration and point it to your base types file (generated by "typescript" plugin)!`
      );
    }

    if (!options.schemaAst?.extensions.sources) {
      throw new Error(`Preset "graphql-modules" requires to use GraphQL SDL`);
    }

    const extensions = options.schemaAst?.extensions;
    const sources = (extensions?.extendedSources ?? []) as Source[];
    const sourcesByModuleMap = groupSourcesByModule(sources, baseOutputDir);
    const modules = Object.keys(sourcesByModuleMap);

    const baseVisitor = new BaseVisitor(options.config, {});
    const { fieldTypes, fieldArguments } = collectObjectFieldTypesAndArguments(options.schemaAst);

    // One file with an output from all plugins
    const baseOutput: Types.GenerateOptions = {
      filename: resolve(cwd, baseOutputDir, baseTypesPath),
      schema: options.schema,
      documents: options.documents,
      plugins: [
        ...options.plugins,
        {
          'modules-exported-scalars': {},
        },
      ],
      pluginMap: {
        ...options.pluginMap,
        'modules-exported-scalars': {
          plugin: (schema) => {
            const typeMap = schema.getTypeMap();

            return Object.keys(typeMap)
              .map((t) => {
                if (t && typeMap[t] && isScalarType(typeMap[t]) && !isGraphQLPrimitive(t)) {
                  const convertedName = baseVisitor.convertName(t);
                  return `export type ${convertedName} = Scalars["${t}"];`;
                }

                return null;
              })
              .filter(Boolean)
              .join('\n');
          },
        },
      },
      config: {
        ...options.config,
        enumsAsTypes: true,
      },
      schemaAst: options.schemaAst,
    };

    const baseTypesFilename = baseTypesPath.replace(/\.(js|ts|d.ts)$/, '');
    const baseTypesDir = stripFilename(baseOutput.filename);

    // One file per each module
    const outputs: Types.GenerateOptions[] = modules.map((moduleName) => {
      const filename = resolve(cwd, baseOutputDir, moduleName, options.presetConfig.filename);
      const dirpath = stripFilename(filename);
      const relativePath = relative(dirpath, baseTypesDir);
      const importPath =
        options.presetConfig.importBaseTypesFrom ||
        normalize(join(relativePath, baseTypesFilename));
      const sources = sourcesByModuleMap[moduleName];

      const documents = sources.map((source) => source.document) as DocumentNode[];

      const moduleDocument = concatAST(documents);

      const shouldDeclare = filename.endsWith('.d.ts');

      return {
        filename,
        schema: options.schema,
        documents: [],
        plugins: [
          ...options.plugins.filter((p) => typeof p === 'object' && !!p.add),
          {
            'graphql-modules-plugin': {},
          },
        ],
        pluginMap: {
          ...options.pluginMap,
          'graphql-modules-plugin': {
            plugin: (schema) =>
              buildModule(moduleName, moduleDocument, {
                importNamespace: importTypesNamespace,
                importPath,
                encapsulate: encapsulateModuleTypes || 'namespace',
                requireRootResolvers,
                shouldDeclare,
                schema,
                baseVisitor,
                useGraphQLModules: false,
                fieldTypes,
                fieldArguments,
                rootTypes: [
                  schema.getQueryType()?.name || '',
                  schema.getMutationType()?.name || '',
                  schema.getSubscriptionType()?.name || '',
                ].filter(Boolean),
              }),
          },
        },
        config: options.config,
        schemaAst: options.schemaAst,
      };
    });

    return [baseOutput].concat(outputs);
  },
};

export default preset;
