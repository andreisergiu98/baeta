import { createPluginV1 } from '@baeta/generator-sdk';
import { generate } from './lib/codegen';

export function graphqlPlugin() {
  return createPluginV1({
    name: 'graphql',
    actionName: 'GraphQL modules',
    watch: (options) => {
      return {
        include: options.schemas,
        ignore: [],
      };
    },
    generate: async (ctx, next) => {
      const files = await generate(ctx.generatorOptions);
      ctx.fileManager.add(...files);
      return next();
    },
  });
}
