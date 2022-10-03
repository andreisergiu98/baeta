import { createPluginFactoryV1 } from '@baeta/plugin';
import { generate } from './codegen';
import { GraphqlPluginConfig } from './config';

export type { GraphqlPluginConfig };

export default createPluginFactoryV1<GraphqlPluginConfig>({
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
