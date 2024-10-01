import { performance } from 'node:perf_hooks';
import { Plugin, formatMessages } from 'esbuild';

export interface HooksOptions {
  onBuildStart: (startTime: number) => void | Promise<void>;
  onBuildEnd: (buildTime: number, warnings: string[], errors: string[]) => void | Promise<void>;
}

export function createEsbuildCliHooksPlugin(options: HooksOptions): Plugin {
  let startTime = 0;

  return {
    name: 'esbuild-plugin-baeta-cli-hooks',
    setup(build) {
      build.onStart(async () => {
        startTime = performance.now();
        await options?.onBuildStart(startTime);
      });

      build.onEnd(async (result) => {
        const buildTime = performance.now() - startTime;

        const [warnings, errors] = await Promise.all([
          formatMessages(result.warnings, {
            kind: 'warning',
            color: true,
          }),
          formatMessages(result.errors, {
            kind: 'error',
            color: true,
          }),
        ]);

        await options.onBuildEnd(buildTime, warnings, errors);
      });
    },
  };
}
