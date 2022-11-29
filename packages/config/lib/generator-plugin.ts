import { BaetaOptions } from './config';
import { GeneratorCtxV1 } from './generator';
import { PluginType } from './plugin';

type MatchPattern = string | RegExp;
type Matcher = MatchPattern | MatchPattern[];

export enum GeneratorPluginVersion {
  V1,
}

export interface GeneratorPluginParams<Config, Store> {
  config: Config;
  ctx: GeneratorCtxV1<Store>;
  next: () => Promise<void>;
}

export type GeneratorPluginFn<Config, Store> = (
  params: GeneratorPluginParams<Config, Store>
) => Promise<void>;

export type GeneratorPluginV1<Config, Store> = {
  name: string;
  setup?: GeneratorPluginFn<Config, Store>;
  generate?: GeneratorPluginFn<Config, Store>;
  end?: GeneratorPluginFn<Config, Store>;
  watch?: GeneratorPluginV1WatchOptions<Config>;
};

export type GeneratorPluginV1WatchOptions<PluginConfig> = (
  baetaConfig: BaetaOptions,
  pluginConfig: PluginConfig
) => {
  include: string | string[];
  ignore: Matcher;
};

export interface GeneratorPluginV1WithConfig<Config, Store> {
  name: string;
  version: GeneratorPluginVersion.V1;
  type: PluginType.Generator;
  config: Config;
  setup: GeneratorPluginFn<Config, Store>;
  generate: GeneratorPluginFn<Config, Store>;
  end: GeneratorPluginFn<Config, Store>;
  watch: GeneratorPluginV1WatchOptions<Config>;
}
