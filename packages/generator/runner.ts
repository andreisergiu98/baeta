import { GeneratorPluginFn, GeneratorPluginV1WithConfig } from '@baeta/plugin';
import { GeneratorCtx } from './generate';

export function createRunner(
  ctx: GeneratorCtx,
  plugins: GeneratorPluginV1WithConfig[],
  getFn: (plugin: GeneratorPluginV1WithConfig) => GeneratorPluginFn<unknown, {}>,
  onFinish?: (plugin: GeneratorPluginV1WithConfig) => void
) {
  let i = 0;

  const next = async () => {
    const plugin = plugins[i++];

    if (!plugin) {
      return Promise.resolve();
    }

    const fn = getFn(plugin);

    await fn({
      config: plugin.config,
      ctx,
      next,
    });

    onFinish?.(plugin);
  };

  return next;
}

export function startRunner(
  ctx: GeneratorCtx,
  plugins: GeneratorPluginV1WithConfig[],
  getFn: (plugin: GeneratorPluginV1WithConfig) => GeneratorPluginFn<unknown, {}>,
  onFinish?: (plugin: GeneratorPluginV1WithConfig) => void
) {
  const run = createRunner(ctx, plugins, getFn, onFinish);
  return run();
}
