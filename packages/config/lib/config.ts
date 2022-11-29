import { CompilerOptions } from './compiler';
import { GeneratorPluginV1WithConfig } from './generator-plugin';
import { GraphqlPluginOptions } from './graphql-plugin';

export interface BaetaOptions {
  graphql: GraphqlPluginOptions;
  plugins?: GeneratorPluginV1WithConfig<any, any>[];
  compiler?: CompilerOptions;
}
