import type { Config } from '@baeta/core';
import { GeneratorPluginV1WithConfig, PluginType } from '@baeta/plugin';
import graphqlPlugin from '@baeta/plugin-graphql';
import chokidar from 'chokidar';
import { createFileManager, FileManager } from './file-manager';
import { startRunner } from './runner';

export interface GeneratorConfig {
  plugins: GeneratorPluginV1WithConfig[];
}

export type GeneratorCtx<T = Record<string, unknown>> = {
  fileManager: FileManager;
  didSetup: string[];
  didGenerate: string[];
  didEnd: string[];
  pluginNames: string[];
  config: Config;
} & T;

function getPlugins(config: Config) {
  const plugins =
    config.plugins?.filter((plugin) => plugin.type === PluginType.Generator) ?? [];
  plugins.push(graphqlPlugin(config.graphql));
  return plugins;
}

async function executeGenerator(
  config: Config,
  plugins: GeneratorPluginV1WithConfig[],
  prev?: GeneratorCtx
) {
  const ctx: GeneratorCtx = {
    fileManager: createFileManager(),
    didSetup: [],
    didGenerate: [],
    didEnd: [],
    pluginNames: plugins.map((plugin) => plugin.name),
    config,
  };

  const first = plugins[0];

  if (first == null) {
    return;
  }

  const onSetup = (plugin: GeneratorPluginV1WithConfig) => {
    ctx.didSetup.push(plugin.name);
  };

  const onGenerate = (plugin: GeneratorPluginV1WithConfig) => {
    ctx.didGenerate.push(plugin.name);
  };

  const onEnd = (plugin: GeneratorPluginV1WithConfig) => {
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

export async function generate(config: Config) {
  const plugins = getPlugins(config);
  await executeGenerator(config, plugins);
}

export function generateAndWatch(config: Config, watchOptions?: WatchOptions) {
  const plugins = getPlugins(config);

  const pluginsWatchOptions = plugins.map((plugin) =>
    plugin.watch(config, plugin.config)
  );
  const toWatch = pluginsWatchOptions.map((options) => options.include).flat();
  const toIgnore = pluginsWatchOptions.map((options) => options.ignore).flat();

  let previousCtx: GeneratorCtx | undefined;

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
