import { createPluginV1, Ctx, GeneratorPluginV1WatchOptions } from '@baeta/generator-sdk';

export interface ExecPluginOptions {
  name?: string;
  actionName?: string;
  exec: string | ((ctx: Ctx) => void | Promise<void>);
  watch?: GeneratorPluginV1WatchOptions;
  skip?: (ctx: Ctx) => boolean | Promise<boolean>;
}

let execa: typeof import('execa') | undefined;

export function createExecPlugin(options: ExecPluginOptions) {
  return createPluginV1({
    name: options.name || 'exec-plugin',
    actionName: options.actionName || 'custom command',
    watch: options.watch,
    generate: async (ctx, next) => {
      if (!execa) {
        execa = await import('execa');
      }

      const skipped = await options.skip?.(ctx);

      if (skipped === true) {
        return next();
      }

      if (typeof options.exec !== 'string') {
        await options.exec(ctx);
        return next();
      }

      const child = execa.execaCommand(options.exec, {
        cwd: process.cwd(),
        stdio: 'pipe',
      });

      await child.catch((err) => {
        throw new Error(err.stderr);
      });

      return next();
    },
  });
}

export default createExecPlugin;
