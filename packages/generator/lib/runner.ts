import { GeneratorCtxV1, GeneratorPluginFn, GeneratorPluginV1WithConfig } from '@baeta/config';

export function createRunner(
  ctx: GeneratorCtxV1,
  plugins: GeneratorPluginV1WithConfig<unknown, unknown>[],
  getFn: (
    plugin: GeneratorPluginV1WithConfig<unknown, unknown>
  ) => GeneratorPluginFn<unknown, Record<string, unknown>>,
  onFinish?: (plugin: GeneratorPluginV1WithConfig<unknown, unknown>) => void
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
  ctx: GeneratorCtxV1,
  plugins: GeneratorPluginV1WithConfig<unknown, unknown>[],
  getFn: (
    plugin: GeneratorPluginV1WithConfig<unknown, unknown>
  ) => GeneratorPluginFn<unknown, Record<string, unknown>>,
  onFinish?: (plugin: GeneratorPluginV1WithConfig<unknown, unknown>) => void
) {
  const run = createRunner(ctx, plugins, getFn, onFinish);
  return run();
}
