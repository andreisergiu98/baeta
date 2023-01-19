import { createPluginV1, Ctx, GeneratorPluginV1WatchOptions } from '@baeta/generator-sdk';
import { execaCommand } from 'execa';

export interface ExecPluginOptions {
  name?: string;
  actionName?: string;
  exec: string | ((ctx: Ctx) => void | Promise<void>);
  watch?: GeneratorPluginV1WatchOptions;
  skip?: (ctx: Ctx) => boolean | Promise<boolean>;
}

export default createExecPlugin;

export function createExecPlugin(options: ExecPluginOptions) {
  return createPluginV1({
    name: options.name || 'exec-plugin',
    actionName: options.actionName || 'custom command',
    watch: options.watch,
    generate: async (ctx, next) => {
      const skipped = await options.skip?.(ctx);

      if (skipped === true) {
        return next();
      }

      if (typeof options.exec !== 'string') {
        await options.exec(ctx);
        return next();
      }

      const child = execaCommand(options.exec, {
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
