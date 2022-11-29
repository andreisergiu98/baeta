import {
  GeneratorPluginFn,
  GeneratorPluginV1,
  GeneratorPluginV1WithConfig,
  GeneratorPluginVersion,
  PluginType,
} from '@baeta/config';

const defaultPluginFn: GeneratorPluginFn<unknown, unknown> = async (params) => {
  return params.next();
};

const defaultWatchFn = () => ({ include: [], ignore: [] });

export function createPluginFactoryV1<Config, Store = {}>(
  options: GeneratorPluginV1<Config, Store>
) {
  return (config: Config): GeneratorPluginV1WithConfig<Config, Store> => ({
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
