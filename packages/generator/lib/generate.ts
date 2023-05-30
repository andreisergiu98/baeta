import {
  Ctx,
  GeneratorOptions,
  GeneratorPluginV1,
  Watcher,
  WatcherFile,
} from '@baeta/generator-sdk';
import { loadOptions } from './config';
import { createCtx } from './ctx';
import { cleanPreviousFiles } from './file-utils';
import { getStateFilename, saveState } from './persistence';
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
  const stateFilename = getStateFilename(generatorOptions.cwd);
  const ctx = createCtx({ generatorOptions, plugins });
  return executeGenerator(ctx, plugins, stateFilename, hooks);
}

export function generateAndWatch(
  options: GeneratorOptions,
  plugins: GeneratorPluginV1<any>[],
  hooks?: GeneratorHooks
) {
  const generatorOptions = loadOptions(options);
  const stateFilename = getStateFilename(generatorOptions.cwd);
  const watcher = new Watcher(generatorOptions.cwd);

  let previousCtx: Ctx | undefined;

  const reload = async (file: WatcherFile) => {
    const ctx = createCtx({
      generatorOptions,
      plugins,
      watching: true,
      changedFile: file,
    });
    previousCtx = await executeGenerator(ctx, plugins, stateFilename, hooks, previousCtx);
  };

  plugins.forEach((plugin) => plugin.watch(generatorOptions, watcher, reload));

  return watcher;
}

async function executeGenerator(
  ctx: Ctx,
  plugins: GeneratorPluginV1[],
  stateFilename: string,
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

    await cleanPreviousFiles(ctx.fileManager, stateFilename, prev?.fileManager);

    await hooks?.onEnd?.()?.catch(() => null);
  } catch (e) {
    await hooks?.onError?.(e)?.catch(() => null);
  }

  saveState(stateFilename, ctx);

  return ctx;
}
