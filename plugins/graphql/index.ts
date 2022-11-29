import { GraphqlPluginOptions } from '@baeta/config';
import { createPluginFactoryV1 } from '@baeta/plugin';
import { generate } from './lib/codegen';

export default createPluginFactoryV1<GraphqlPluginOptions>({
  name: 'graphql',
  watch: (baetaConfig, pluginConfig) => {
    return {
      include: pluginConfig.schemas,
      ignore: [],
    };
  },
  generate: async (params) => {
    const files = await generate(params.config);
    params.ctx.fileManager.add(...files);
    return params.next();
  },
});
