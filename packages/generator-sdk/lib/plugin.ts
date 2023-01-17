import { PluginType } from '@baeta/plugin';
import { GeneratorOptions } from './config';
import { Ctx } from './ctx';

type MatchPattern = string | RegExp;
type Matcher = MatchPattern | MatchPattern[];

export enum GeneratorPluginVersion {
  V1,
}

export interface GeneratorPluginV1Params<Config, Store> {
  config: Config;
  ctx: Ctx<Store>;
  next: () => Promise<void>;
}

export type GeneratorPluginV1Fn<Config, Store> = (
  params: GeneratorPluginV1Params<Config, Store>
) => Promise<void>;

export type GeneratorPluginV1WatchOptions<Config> = (
  generatorOptions: GeneratorOptions,
  pluginConfig: Config
) => {
  include: string | string[];
  ignore: Matcher;
};

export type GeneratorPluginV1Factory<Config, Store> = {
  name: string;
  setup?: GeneratorPluginV1Fn<Config, Store>;
  generate?: GeneratorPluginV1Fn<Config, Store>;
  end?: GeneratorPluginV1Fn<Config, Store>;
  watch?: GeneratorPluginV1WatchOptions<Config>;
};

export interface GeneratorPluginV1<Config, Store> {
  name: string;
  version: GeneratorPluginVersion.V1;
  type: PluginType.Generator;
  config: Config;
  setup: GeneratorPluginV1Fn<Config, Store>;
  generate: GeneratorPluginV1Fn<Config, Store>;
  end: GeneratorPluginV1Fn<Config, Store>;
  watch: GeneratorPluginV1WatchOptions<Config>;
}

const defaultPluginFn: GeneratorPluginV1Fn<unknown, unknown> = async (params) => {
  return params.next();
};

const defaultWatchFn = () => ({ include: [], ignore: [] });

export function createPluginFactoryV1<Config, Store = {}>(
  options: GeneratorPluginV1Factory<Config, Store>
) {
  return (config: Config): GeneratorPluginV1<Config, Store> => ({
    name: options.name,
    config,
    version: GeneratorPluginVersion.V1,
    type: PluginType.Generator,
    end: options.end ?? defaultPluginFn,
    generate: options.generate ?? defaultPluginFn,
    setup: options.setup ?? defaultPluginFn,
    watch: options.watch ?? defaultWatchFn,
  });
}

export function isGeneratorPlugin(plugin: {
  type: PluginType;
}): plugin is GeneratorPluginV1<unknown, unknown> {
  return plugin.type === PluginType.Generator;
}

export function getGeneratorPlugins(plugins?: Array<{ type: PluginType }>) {
  if (!plugins) {
    return [];
  }
  return plugins.filter(isGeneratorPlugin);
}
