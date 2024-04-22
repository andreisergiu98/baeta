import { createPluginV1, File } from '@baeta/generator-sdk';
import { readFile, stat } from 'node:fs/promises';
import { relative, resolve } from 'node:path';

export function gitignorePlugin() {
  return createPluginV1({
    name: 'gitignore-plugin',
    actionName: 'add  generated files to .gitignore',
    generate: async (ctx, next) => {
      await next();

      const filePaths = ctx.fileManager.files.map((file) => file.filename);
      const modulesDir = ctx.generatorOptions.modulesDir;
      const moduleDefinitionName = ctx.generatorOptions.moduleDefinitionName;

      const generatedPaths = filePaths
        .map((file) => relative(ctx.generatorOptions.cwd, file))
        .filter((file) => !file.endsWith(moduleDefinitionName));

      generatedPaths.push(
        `${relative(ctx.generatorOptions.cwd, modulesDir)}/**/${moduleDefinitionName}`,
      );

      generatedPaths.sort((a, b) => a.localeCompare(b));

      const gitignoreStart = '# Generated by Baeta - Begin';
      const gitignoreInner = generatedPaths.join('\n');
      const gitignoreEnd = '# Generated by Baeta - End';
      const gitignoreContent = `${gitignoreStart}\n${gitignoreInner}\n${gitignoreEnd}`;

      // We are making an exception for .gitignore and we won't add it to file manager.
      // Since it can be edited by the user, we won't track it in the file manager and we won't delete it if the plugin is disabled.
      const file = new File('.gitignore', '', 'gitignore', {
        addEslintDisableHeader: false,
        addGenerationNoticeHeader: false,
      });

      const exists = await stat(resolve(ctx.generatorOptions.cwd, '.gitignore'))
        .then(() => true)
        .catch(() => false);

      if (!exists) {
        file.content = gitignoreContent;
        return file.write();
      }

      const currentContent = await readFile(
        resolve(ctx.generatorOptions.cwd, '.gitignore'),
        'utf-8',
      );

      const startMarkerIndex = currentContent.indexOf(gitignoreStart);
      const endMarkerIndex = currentContent.indexOf(gitignoreEnd);

      if (startMarkerIndex === -1 || endMarkerIndex === -1) {
        file.content = `${currentContent}\n\n${gitignoreContent}`;
        return file.write();
      }

      file.content =
        currentContent.slice(0, startMarkerIndex) +
        gitignoreContent +
        currentContent.slice(endMarkerIndex + gitignoreEnd.length);

      return file.write();
    },
  });
}