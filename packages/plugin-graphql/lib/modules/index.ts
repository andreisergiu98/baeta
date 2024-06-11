import { join, relative, resolve } from '@baeta/util-path';
import { Types } from '@graphql-codegen/plugin-helpers';
import { BaseVisitor, getConfigValue } from '@graphql-codegen/visitor-plugin-common';
import { Source } from '@graphql-tools/utils';
import {
  DocumentNode,
  ObjectTypeDefinitionNode,
  UnionTypeDefinitionNode,
  UnionTypeExtensionNode,
  concatAST,
  isScalarType,
} from 'graphql';
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
    const { baseTypesPath, extensionsPath, encapsulateModuleTypes } = options.presetConfig;

    const requireRootResolvers = getConfigValue(options?.presetConfig.requireRootResolvers, false);

    const cwd = resolve(options.presetConfig.cwd || process.cwd());
    const importTypesNamespace = options.presetConfig.importTypesNamespace || 'Types';

    if (!baseTypesPath) {
      throw new Error(
        `Preset "graphql-modules" requires you to specify "baseTypesPath" configuration and point it to your base types file (generated by "typescript" plugin)!`,
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
        {
          'modules-exported-picks': {},
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
        'modules-exported-picks': {
          plugin: (schema) => {
            const typePicks: string[] = [];
            const unionPicks: string[] = [];
            const unionResults: string[] = [];
            const interfacePicks: string[] = [];
            const interfaceResults: string[] = [];

            const unionTypesMap: Record<string, string[] | undefined> = {};
            const interfacesTypesMap: Record<string, string[] | undefined> = {};

            for (const moduleName of modules) {
              const sources = sourcesByModuleMap[moduleName];
              const documents = sources.map((source) => source.document) as DocumentNode[];
              const moduleDocument = concatAST(documents);

              const types = moduleDocument.definitions.filter(
                (def) => def.kind === 'ObjectTypeDefinition',
              ) as ObjectTypeDefinitionNode[];

              const unionsDefinition = moduleDocument.definitions.filter(
                (def) => def.kind === 'UnionTypeDefinition',
              ) as UnionTypeDefinitionNode[];

              const unionsExtensions = moduleDocument.definitions.filter(
                (def) => def.kind === 'UnionTypeExtension',
              ) as UnionTypeExtensionNode[];

              const unions = [...unionsDefinition, ...unionsExtensions];

              for (const type of types) {
                const name = type.name.value;

                for (const interfaceNode of type.interfaces ?? []) {
                  const interfaceName = interfaceNode.name.value;

                  if (interfacesTypesMap[interfaceName] == null) {
                    interfacesTypesMap[interfaceName] = [];
                  }

                  interfacesTypesMap[interfaceName]?.push(name);
                }

                if (name === 'Query' || name === 'Mutation' || name === 'Subscription') {
                  continue;
                }

                const fields = type.fields ?? [];

                if (fields.length === 0) {
                  continue;
                }

                const fieldNames = fields.map((f) => `"${f.name.value}"`).join(' | ');

                typePicks.push(`  ${name}: ${fieldNames};`);
              }

              for (const union of unions) {
                const types = union.types?.map((t) => t.name.value) ?? [];

                if (unionTypesMap[union.name.value] == null) {
                  unionTypesMap[union.name.value] = [];
                }

                unionTypesMap[union.name.value]?.push(...types);
              }
            }

            for (const unionName in unionTypesMap) {
              const types = unionTypesMap[unionName];

              if (types == null || types.length === 0) {
                unionPicks.push(`  ${unionName}: never;`);
                unionResults.push(`  ${unionName}: null;`);
                continue;
              }

              const typePicks = types.map(
                (t) => `Pick<${t}, DefinedFieldsWithoutExtensions["${t}"] | "__typename">`,
              );

              const resultPicks = types.map((t) => `"${t}"`);

              unionPicks.push(`  ${unionName}: ${typePicks.join(' | ')};`);
              unionResults.push(`  ${unionName}: ${resultPicks.join(' | ')} | null;`);
            }

            for (const interfaceName in interfacesTypesMap) {
              const types = interfacesTypesMap[interfaceName];

              if (types == null || types.length === 0) {
                interfacePicks.push(`  ${interfaceName}: never;`);
                interfaceResults.push(`  ${interfaceName}: null;`);
                continue;
              }

              const typePicks = types.map(
                (t) => `Pick<${t}, DefinedFieldsWithoutExtensions["${t}"] | "__typename">`,
              );

              const resultPicks = types.map((t) => `"${t}"`);

              interfacePicks.push(`  ${interfaceName}: ${typePicks.join(' | ')};`);
              interfaceResults.push(`  ${interfaceName}: ${resultPicks.join(' | ')} | null;`);
            }

            const fieldsDefinition = `export type DefinedFieldsWithoutExtensions = {\n${typePicks.join('\n')}\n};`;
            const unionsDefinition = `export type DefinedUnionsWithoutExtensions = {\n${unionPicks.join('\n')}\n};`;
            const unionsResultsDefinition = `export type DefinedUnionsResults = {\n${unionResults.join('\n')}\n};`;
            const interfacesDefinition = `export type DefinedInterfacesWithoutExtensions = {\n${interfacePicks.join('\n')}\n};`;
            const interfacesResultsDefinition = `export type DefinedInterfacesResults = {\n${interfaceResults.join(
              '\n',
            )}\n};`;

            const result = [
              fieldsDefinition,
              unionsDefinition,
              unionsResultsDefinition,
              interfacesDefinition,
              interfacesResultsDefinition,
            ].join('\n\n');

            return `\n${result}\n`;
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
                extensionsPath,
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
