import type { Config as BaetaConfig } from "@baeta/core";
import type { GeneratorCtx } from "@baeta/generator";
import { PluginType } from "./plugin";

type MatchPattern = string | RegExp;
type Matcher = MatchPattern | MatchPattern[];

export { GeneratorCtx };

export enum GeneratorPluginVersion {
  V1,
}

export interface GeneratorPluginParams<Config, Ctx> {
  config: Config;
  ctx: GeneratorCtx<Ctx>;
  next: () => Promise<void>;
}

export type GeneratorPluginFn<Config, Ctx> = (
  params: GeneratorPluginParams<Config, Ctx>
) => Promise<void>;

export type GeneratorPluginV1<Config, Ctx> = {
  name: string;
  setup?: GeneratorPluginFn<Config, Ctx>;
  generate?: GeneratorPluginFn<Config, Ctx>;
  end?: GeneratorPluginFn<Config, Ctx>;
  watch?: GeneratorPluginV1WatchOptions<Config>;
};

export type GeneratorPluginV1WatchOptions<PluginConfig> = (
  baetaConfig: BaetaConfig,
  pluginConfig: PluginConfig
) => {
  include: string | string[];
  ignore: Matcher;
};

export interface GeneratorPluginV1WithConfig<Config = unknown, Ctx = {}> {
  name: string;
  version: GeneratorPluginVersion.V1;
  type: PluginType.Generator;
  config: Config;
  setup: GeneratorPluginFn<Config, Ctx>;
  generate: GeneratorPluginFn<Config, Ctx>;
  end: GeneratorPluginFn<Config, Ctx>;
  watch: GeneratorPluginV1WatchOptions<Config>;
}

const defaultPluginFn: GeneratorPluginFn<unknown, unknown> = async (params) => {
  return params.next();
};

const defaultWatchFn = () => ({ include: [], ignore: [] });

export function createPluginFactoryV1<Config, Ctx = {}>(
  options: GeneratorPluginV1<Config, Ctx>
) {
  return (config: Config) =>
    ({
      name: options.name,
      config,
      version: GeneratorPluginVersion.V1,
      type: PluginType.Generator,
      end: options.end ?? defaultPluginFn,
      generate: options.generate ?? defaultPluginFn,
      setup: options.setup ?? defaultPluginFn,
      watch: options.watch ?? defaultWatchFn,
    } as GeneratorPluginV1WithConfig<unknown>);
}
