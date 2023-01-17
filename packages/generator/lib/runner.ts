import { Ctx, GeneratorPluginV1, GeneratorPluginV1Fn } from '@baeta/generator-sdk';

export function createRunner(
  ctx: Ctx,
  plugins: GeneratorPluginV1<unknown, unknown>[],
  getFn: (
    plugin: GeneratorPluginV1<unknown, unknown>
  ) => GeneratorPluginV1Fn<unknown, Record<string, unknown>>,
  onFinish?: (plugin: GeneratorPluginV1<unknown, unknown>) => void
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
  ctx: Ctx,
  plugins: GeneratorPluginV1<unknown, unknown>[],
  getFn: (
    plugin: GeneratorPluginV1<unknown, unknown>
  ) => GeneratorPluginV1Fn<unknown, Record<string, unknown>>,
  onFinish?: (plugin: GeneratorPluginV1<unknown, unknown>) => void
) {
  const run = createRunner(ctx, plugins, getFn, onFinish);
  return run();
}
