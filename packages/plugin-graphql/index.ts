import { createPluginV1, isMatch, WatcherFile } from '@baeta/generator-sdk';
import { generate } from './lib/codegen';

export function graphqlPlugin() {
  return createPluginV1({
    name: 'graphql',
    actionName: 'GraphQL modules',
    watch: (options, watcher, reload) => {
      const handleChange = (file: WatcherFile) => {
        if (isMatch(file.relativePath, options.schemas)) {
          reload(file);
        }
      };

      watcher.on('update', handleChange);
      watcher.on('delete', handleChange);
    },
    generate: async (ctx, next) => {
      const files = await generate(ctx.generatorOptions);
      ctx.fileManager.add(...files);
      return next();
    },
  });
}
