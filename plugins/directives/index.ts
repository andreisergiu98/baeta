import { definitions } from '@baeta/directives';
import { createPluginV1, File } from '@baeta/generator-sdk';
import { join, parse } from 'path';

interface DirectivesOptions {
  moduleName?: string;
}

function printExport(moduleDefinitionName: string) {
  const parsed = parse(moduleDefinitionName);
  const importName = parsed.ext === '.ts' ? parsed.name : moduleDefinitionName;

  return `import { getDirectivesModule } from "./${importName}";
import { definitions } from "@baeta/directives";

export const directiveModule = getDirectivesModule();
definitions.forEach(definition => directiveModule.$directive(definition.directive));
`;
}

function printDefinitions() {
  return definitions.map((definition) => definition.sdl).join('\n');
}

function createDirectivesModuleDir(modulesDir: string, moduleName = 'directives') {
  return join(modulesDir, moduleName);
}

function createGqlFilename(moduleDir: string) {
  return `${moduleDir}/directives.gql`;
}

function createExportFilename(moduleDir: string) {
  return `${moduleDir}/index.ts`;
}

export function directivesPlugin(options?: DirectivesOptions) {
  return createPluginV1({
    name: 'directives',
    actionName: 'directives',
    watch: (generatorOptions) => {
      return {
        include: [],
        ignore: [createDirectivesModuleDir(generatorOptions.modulesDir, options?.moduleName)],
      };
    },
    generate: async (ctx, next) => {
      const moduleDir = createDirectivesModuleDir(
        ctx.generatorOptions.modulesDir,
        options?.moduleName
      );

      const definitionFile = new File(
        createGqlFilename(moduleDir),
        printDefinitions(),
        'directives'
      );

      await definitionFile.write();

      ctx.fileManager.add(definitionFile);

      const exportFile = new File(
        createExportFilename(moduleDir),
        printExport(ctx.generatorOptions.moduleDefinitionName),
        'directives'
      );

      ctx.fileManager.add(exportFile);

      return next();
    },
  });
}
