import { definitions } from '@baeta/directives';
import { createPluginV1, getModuleGetName, getModuleVariableName } from '@baeta/generator-sdk';
import { join, parse } from '@baeta/util-path';

interface DirectivesOptions {
  moduleName?: string;
}

function printResolver(moduleDefinitionName: string, moduleName: string) {
  const parsed = parse(moduleDefinitionName);
  const method = getModuleGetName(moduleName);
  const importName = parsed.ext === '.ts' ? parsed.name : moduleDefinitionName;

  return `import { registerDirectives } from "@baeta/directives";

import { ${method} } from "./${importName}";

registerDirectives(${method}());
`;
}

function printExport(moduleDefinitionName: string, moduleName: string) {
  const parsed = parse(moduleDefinitionName);
  const method = getModuleGetName(moduleName);
  const variable = getModuleVariableName(moduleName);
  const importName = parsed.ext === '.ts' ? parsed.name : moduleDefinitionName;

  return `import { ${method} } from "./${importName}";

import "./directives.baeta";

export const ${variable} = ${method}();
`;
}

function printDefinitions() {
  return definitions.map((definition) => definition.sdl).join('\n');
}

function createDirectivesModuleDir(modulesDir: string, moduleName: string) {
  return join(modulesDir, moduleName);
}

function createGqlFilename(moduleDir: string) {
  return `${moduleDir}/directives.gql`;
}

function createResolverFilename(moduleDir: string) {
  return `${moduleDir}/directives.baeta.ts`;
}

function createExportFilename(moduleDir: string) {
  return `${moduleDir}/index.ts`;
}

export function directivesPlugin(options?: DirectivesOptions) {
  const { moduleName = 'baeta-directives' } = options ?? {};

  return createPluginV1({
    name: 'directives',
    actionName: 'directives',
    watch: (generatorOptions, watcher) => {
      watcher.ignore(`${createDirectivesModuleDir(generatorOptions.modulesDir, moduleName)}/**`);
    },
    generate: async (ctx, next) => {
      const moduleDir = createDirectivesModuleDir(ctx.generatorOptions.modulesDir, moduleName);

      const definitionFile = ctx.fileManager.createAndAdd(
        createGqlFilename(moduleDir),
        printDefinitions(),
        'directives',
      );
      await definitionFile.write();

      ctx.fileManager.createAndAdd(
        createResolverFilename(moduleDir),
        printResolver(ctx.generatorOptions.moduleDefinitionName, moduleName),
        'directives',
      );

      ctx.fileManager.createAndAdd(
        createExportFilename(moduleDir),
        printExport(ctx.generatorOptions.moduleDefinitionName, moduleName),
        'directives',
      );

      return next();
    },
  });
}
