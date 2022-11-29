import {
  BaetaOptions,
  GeneratorCtxV1,
  GeneratorPluginV1WithConfig,
  PluginType,
} from '@baeta/config';
import graphqlPlugin from '@baeta/plugin-graphql';
import chokidar from 'chokidar';
import { createGeneratorCtxV1 } from './ctx';
import { startRunner } from './runner';

function getPlugins(config: BaetaOptions) {
  const plugins = config.plugins?.filter((plugin) => plugin.type === PluginType.Generator) ?? [];
  plugins.push(graphqlPlugin(config.graphql));
  return plugins;
}

async function executeGenerator(
  config: BaetaOptions,
  plugins: GeneratorPluginV1WithConfig<unknown, unknown>[],
  prev?: GeneratorCtxV1
) {
  const ctx = createGeneratorCtxV1(config, plugins);
  const first = plugins[0];

  if (first == null) {
    return;
  }

  const onSetup = (plugin: GeneratorPluginV1WithConfig<unknown, unknown>) => {
    ctx.didSetup.push(plugin.name);
  };

  const onGenerate = (plugin: GeneratorPluginV1WithConfig<unknown, unknown>) => {
    ctx.didGenerate.push(plugin.name);
  };

  const onEnd = (plugin: GeneratorPluginV1WithConfig<unknown, unknown>) => {
    ctx.didEnd.push(plugin.name);
  };

  await startRunner(ctx, plugins, (plugin) => plugin.setup, onSetup);
  await startRunner(ctx, plugins, (plugin) => plugin.generate, onGenerate);
  await startRunner(ctx, plugins, (plugin) => plugin.end, onEnd);

  await ctx.fileManager.writeAll();

  if (prev) {
    const currentFiles = ctx.fileManager.getAll();

    for (const file of currentFiles) {
      if (!file.persisted) {
        continue;
      }
      prev.fileManager.remove(file.filename);
    }

    prev.fileManager.unlinkAll();
  }

  return ctx;
}

interface WatchOptions {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: unknown) => void;
}

export async function generate(config: BaetaOptions) {
  const plugins = getPlugins(config);
  await executeGenerator(config, plugins);
}

export function generateAndWatch(config: BaetaOptions, watchOptions?: WatchOptions) {
  const plugins = getPlugins(config);

  const pluginsWatchOptions = plugins.map((plugin) => plugin.watch(config, plugin.config));
  const toWatch = pluginsWatchOptions.map((options) => options.include).flat();
  const toIgnore = pluginsWatchOptions.map((options) => options.ignore).flat();

  let previousCtx: GeneratorCtxV1 | undefined;

  const handler = async () => {
    try {
      watchOptions?.onStart?.();
      previousCtx = await executeGenerator(config, plugins, previousCtx);
      watchOptions?.onEnd?.();
    } catch (err) {
      watchOptions?.onError?.(err);
    }
  };

  return chokidar
    .watch(toWatch, {
      ignored: toIgnore,
    })
    .on('change', handler)
    .on('unlink', handler);
}
