import { PluginType } from '@baeta/plugin';
import { NormalizedGeneratorOptions } from './config';
import { Ctx } from './ctx';

type MatchPattern = string | RegExp;
type Matcher = MatchPattern | MatchPattern[];

export enum GeneratorPluginVersion {
  V1 = 'v1',
}

export type GeneratorPluginV1Fn<Store = unknown> = (
  ctx: Ctx<Store>,
  next: () => Promise<void>
) => Promise<void>;

export type GeneratorPluginV1WatchOptions = (options: NormalizedGeneratorOptions) => {
  include: string | string[];
  ignore: Matcher;
};

export type GeneratorPluginV1Factory<Store = unknown> = {
  name: string;
  actionName: string;
  setup?: GeneratorPluginV1Fn<Store>;
  generate?: GeneratorPluginV1Fn<Store>;
  end?: GeneratorPluginV1Fn<Store>;
  watch?: GeneratorPluginV1WatchOptions;
};

export interface GeneratorPluginV1<Store = unknown> {
  name: string;
  actionName: string;
  version: GeneratorPluginVersion.V1;
  type: PluginType.Generator;
  setup: GeneratorPluginV1Fn<Store>;
  generate: GeneratorPluginV1Fn<Store>;
  end: GeneratorPluginV1Fn<Store>;
  watch: GeneratorPluginV1WatchOptions;
}

const defaultPluginFn: GeneratorPluginV1Fn<unknown> = async (ctx, next) => {
  return next();
};

const defaultWatchFn = () => ({ include: [], ignore: [] });

export function createPluginV1<Store = {}>(
  options: GeneratorPluginV1Factory<Store>
): GeneratorPluginV1<Store> {
  return {
    name: options.name,
    actionName: options.actionName,
    version: GeneratorPluginVersion.V1,
    type: PluginType.Generator,
    end: options.end ?? defaultPluginFn,
    generate: options.generate ?? defaultPluginFn,
    setup: options.setup ?? defaultPluginFn,
    watch: options.watch ?? defaultWatchFn,
  };
}

export function isGeneratorPlugin(plugin: {
  type: PluginType;
}): plugin is GeneratorPluginV1<unknown> {
  return plugin.type === PluginType.Generator;
}

export function getGeneratorPlugins(plugins?: Array<{ type: PluginType }>) {
  if (!plugins) {
    return [];
  }
  return plugins.filter(isGeneratorPlugin);
}
