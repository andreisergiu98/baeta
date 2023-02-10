import { Ctx, GeneratorOptions, GeneratorPluginV1 } from '@baeta/generator-sdk';
import chokidar from 'chokidar';
import { loadOptions } from './config';
import { createCtx } from './ctx';
import { cleanPreviousFiles } from './file-utils';
import { startRunner } from './runner';

export interface GeneratorHooks {
  onStart?: () => void | Promise<void>;
  onEnd?: () => void | Promise<void>;
  onError?: (error: unknown) => void | Promise<void>;
  onPluginStepStart?: (
    plugin: GeneratorPluginV1,
    step: 'setup' | 'generate' | 'end'
  ) => void | Promise<void>;
  onPluginStepEnd?: (
    plugin: GeneratorPluginV1,
    step: 'setup' | 'generate' | 'end'
  ) => void | Promise<void>;
}

export async function generate(
  options: GeneratorOptions,
  plugins: GeneratorPluginV1<any>[],
  hooks?: GeneratorHooks
) {
  const generatorOptions = loadOptions(options);
  const ctx = createCtx({ generatorOptions, plugins });
  return executeGenerator(ctx, plugins, hooks);
}

export function generateAndWatch(
  options: GeneratorOptions,
  plugins: GeneratorPluginV1<any>[],
  hooks?: GeneratorHooks
) {
  const generatorOptions = loadOptions(options);
  const pluginsWatchOptions = plugins.map((plugin) => plugin.watch(generatorOptions));
  const toWatch = pluginsWatchOptions.flatMap((options) => options.include);
  const toIgnore = pluginsWatchOptions.flatMap((options) => options.ignore);

  let previousCtx: Ctx | undefined;

  const handleChange = async (file: string) => {
    const ctx = createCtx({
      generatorOptions,
      plugins,
      watching: true,
      changedFile: file,
    });
    previousCtx = await executeGenerator(ctx, plugins, hooks, previousCtx);
  };

  return chokidar
    .watch(toWatch, {
      ignored: toIgnore,
      cwd: generatorOptions.cwd,
    })
    .on('change', handleChange)
    .on('unlink', handleChange);
}

async function executeGenerator(
  ctx: Ctx,
  plugins: GeneratorPluginV1[],
  hooks?: GeneratorHooks,
  prev?: Ctx
) {
  const first = plugins[0];

  if (first == null) {
    return;
  }

  const onSetupStart = (plugin: GeneratorPluginV1) => {
    hooks?.onPluginStepStart?.(plugin, 'setup');
  };

  const onGenerateStart = (plugin: GeneratorPluginV1) => {
    hooks?.onPluginStepStart?.(plugin, 'generate');
  };

  const onEndStart = (plugin: GeneratorPluginV1) => {
    hooks?.onPluginStepStart?.(plugin, 'end');
  };

  const onSetupEnd = (plugin: GeneratorPluginV1) => {
    ctx.didSetup.push(plugin.name);
    hooks?.onPluginStepEnd?.(plugin, 'setup');
  };

  const onGenerateEnd = (plugin: GeneratorPluginV1) => {
    ctx.didGenerate.push(plugin.name);
    hooks?.onPluginStepEnd?.(plugin, 'generate');
  };

  const onEndEnd = (plugin: GeneratorPluginV1) => {
    ctx.didEnd.push(plugin.name);
    hooks?.onPluginStepEnd?.(plugin, 'setup');
  };

  try {
    await hooks?.onStart?.()?.catch(() => null);

    await startRunner(ctx, plugins, (plugin) => plugin.setup, onSetupStart, onSetupEnd);
    await startRunner(ctx, plugins, (plugin) => plugin.generate, onGenerateStart, onGenerateEnd);
    await startRunner(ctx, plugins, (plugin) => plugin.end, onEndStart, onEndEnd);

    await ctx.fileManager.writeAll();
    await cleanPreviousFiles(ctx.fileManager, prev?.fileManager);

    await hooks?.onEnd?.()?.catch(() => null);
  } catch (e) {
    await hooks?.onError?.(e)?.catch(() => null);
  }

  return ctx;
}
