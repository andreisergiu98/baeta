import { Ctx, GeneratorOptions, GeneratorPluginV1 } from '@baeta/generator-sdk';
import chokidar from 'chokidar';
import { createCtx } from './ctx';
import { cleanPreviousFiles } from './file-utils';
import { startRunner } from './runner';

async function executeGenerator(
  config: GeneratorOptions,
  plugins: GeneratorPluginV1<unknown, unknown>[],
  hooks?: HookOptions,
  prev?: Ctx
) {
  const ctx = createCtx(config, plugins);
  const first = plugins[0];

  if (first == null) {
    return;
  }

  const onSetup = (plugin: GeneratorPluginV1<unknown, unknown>) => {
    ctx.didSetup.push(plugin.name);
  };

  const onGenerate = (plugin: GeneratorPluginV1<unknown, unknown>) => {
    ctx.didGenerate.push(plugin.name);
  };

  const onEnd = (plugin: GeneratorPluginV1<unknown, unknown>) => {
    ctx.didEnd.push(plugin.name);
  };

  try {
    await hooks?.onStart?.()?.catch(() => null);

    await startRunner(ctx, plugins, (plugin) => plugin.setup, onSetup);
    await startRunner(ctx, plugins, (plugin) => plugin.generate, onGenerate);
    await startRunner(ctx, plugins, (plugin) => plugin.end, onEnd);

    await ctx.fileManager.writeAll();
    await cleanPreviousFiles(ctx.fileManager, prev?.fileManager);

    await hooks?.onEnd?.()?.catch(() => null);
  } catch (e) {
    await hooks?.onError?.(e)?.catch(() => null);
  }

  return ctx;
}

interface HookOptions {
  onStart?: () => void | Promise<void>;
  onEnd?: () => void | Promise<void>;
  onError?: (error: unknown) => void | Promise<void>;
}

export async function generate(
  options: GeneratorOptions,
  plugins: GeneratorPluginV1<any, any>[],
  hooks?: HookOptions
) {
  return executeGenerator(options, plugins, hooks);
}

export function generateAndWatch(
  options: GeneratorOptions,
  plugins: GeneratorPluginV1<any, any>[],
  hooks?: HookOptions
) {
  const pluginsWatchOptions = plugins.map((plugin) => plugin.watch(options, plugin.config));
  const toWatch = pluginsWatchOptions.flatMap((options) => options.include);
  const toIgnore = pluginsWatchOptions.flatMap((options) => options.ignore);

  let previousCtx: Ctx | undefined;

  const handler = async () => {
    previousCtx = await executeGenerator(options, plugins, hooks, previousCtx);
  };

  return chokidar
    .watch(toWatch, {
      ignored: toIgnore,
    })
    .on('change', handler)
    .on('unlink', handler);
}
