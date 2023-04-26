import { createPluginV1, File, getModuleGetName } from '@baeta/generator-sdk';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

interface ResolverOptions {
  suffix?: string;
  match?: (filename: string) => boolean;
}

interface ModuleOptions {
  match?: (moduleName: string) => boolean;
}

export interface AutoloadPluginOptions {
  resolvers?: boolean | ResolverOptions;
  modules?: boolean | ModuleOptions;
  output?: string;
}

async function findFiles(baseDir: string, predicate: (file: string) => boolean) {
  const matchedPaths: string[] = [];

  const entries = await fs.readdir(baseDir);
  for (const entry of entries) {
    const fullPath = path.isAbsolute(entry) ? entry : path.join(baseDir, entry);
    const stat = await fs.stat(fullPath);

    if (stat.isFile() && predicate(fullPath)) {
      matchedPaths.push(fullPath);
    } else if (stat.isDirectory()) {
      entries.push(...(await findFiles(fullPath, predicate)));
    }
  }

  return matchedPaths;
}

function suffix(str: string) {
  return (input: string) => input.endsWith(str);
}

export function autoloadPlugin(options?: AutoloadPluginOptions) {
  const enableResolversAutoload = options?.resolvers !== false;
  const resolversSuffix =
    (typeof options?.resolvers === 'object' ? options.resolvers.suffix : undefined) ??
    'resolver.ts';
  const resolversMatcher =
    (typeof options?.resolvers === 'object' ? options.resolvers.match : undefined) ?? (() => true);

  const enableModulesAutoload = options?.modules !== false;
  const modulesMatcher =
    (typeof options?.modules === 'object' ? options.modules.match : undefined) ?? (() => true);

  const outputPath = options?.output;

  return createPluginV1({
    name: 'autoload',
    actionName: 'autoload',
    async generate(ctx, next) {
      await next();

      const resolvers = (
        !enableResolversAutoload
          ? []
          : await findFiles(ctx.generatorOptions.modulesDir, suffix(resolversSuffix))
      ).filter(resolversMatcher);

      const typedefs = !enableModulesAutoload
        ? []
        : ctx.fileManager
            .getByTag('graphql')
            .filter((file) => file.filename.endsWith(ctx.generatorOptions.moduleDefinitionName));

      let text =
        resolvers
          .map(
            (resolver) =>
              `import "./${path
                .relative(ctx.generatorOptions.modulesDir, resolver)
                .replace('.ts', '')}";`
          )
          .join('\n') + '\n\n';

      const moduleGetters: string[] = [];
      for (const typedef of typedefs) {
        const moduleName = path.dirname(typedef.filename).split(path.sep).pop();
        if (!moduleName) continue;
        if (!modulesMatcher(moduleName)) continue;

        const moduleGetter = getModuleGetName(moduleName);

        text += `import {${moduleGetter}} from "./${path
          .relative(ctx.generatorOptions.modulesDir, typedef.filename)
          .replace('.ts', '')}";\n`;

        moduleGetters.push(`${moduleGetter}()`);
      }

      text += `\nexport const modules = [${moduleGetters.join(', ')}];\n`;

      const generatedFileName = outputPath
        ? path.join(ctx.generatorOptions.cwd, outputPath)
        : path.join(ctx.generatorOptions.modulesDir, 'autoload.ts');
      const file = new File(generatedFileName, text, 'autoloader');
      ctx.fileManager.add(file);
    },
  });
}
