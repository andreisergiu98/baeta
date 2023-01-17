import { createPluginFactoryV1, GeneratorOptions } from '@baeta/generator-sdk';
import { generate } from './lib/codegen';

export default createPluginFactoryV1<GeneratorOptions>({
  name: 'graphql',
  watch: (generatorOptions, pluginOptions) => {
    return {
      include: pluginOptions.schemas,
      ignore: [],
    };
  },
  generate: async (params) => {
    const files = await generate(params.config);
    params.ctx.fileManager.add(...files);
    return params.next();
  },
});
