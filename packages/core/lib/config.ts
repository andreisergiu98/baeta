import type { CompilerOptions } from '@baeta/compiler';
import type { GeneratorPluginV1WithConfig } from '@baeta/plugin';
import type { GraphqlPluginConfig } from '@baeta/plugin-graphql';

export interface Config {
  graphql: GraphqlPluginConfig;
  plugins?: Array<GeneratorPluginV1WithConfig>;
  compiler?: CompilerOptions;
}

export function createConfig(config: Config) {
  return { config };
}
