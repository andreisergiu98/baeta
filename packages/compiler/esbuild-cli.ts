import { formatMessages, Plugin } from 'esbuild';
import { ExecaChildProcess, execaCommand } from 'execa';
import { performance } from 'perf_hooks';
import { Writable } from 'stream';
import kill from 'tree-kill';
import { Hooks } from './esbuild-config';

async function killProcess(process: ExecaChildProcess) {
  return new Promise<void>((resolve) => {
    if (process.pid == null) {
      return resolve();
    }
    kill(process.pid, 'SIGKILL', () => resolve());
  });
}

async function killProcesses(processes: ExecaChildProcess[]) {
  await Promise.all(processes.map((process) => killProcess(process)));
  processes.splice(0, processes.length);
}

function createStream(onData: (data: string) => void) {
  const stream = new Writable({
    write(chunk, encoding, next) {
      onData(chunk.toString());
      next();
    },
  });
  return stream;
}

async function handleCommand(processes: ExecaChildProcess[], options?: CommandOptions) {
  if (!options) {
    return;
  }

  const child = execaCommand(options.command, {
    stdout: 'pipe',
    stderr: 'pipe',
    stripFinalNewline: true,
  });

  if (options.stdout != null) {
    const stream = createStream(options.stdout);
    child.stdout?.pipe(stream);
    child.stderr?.pipe(stream);
  }

  child.catch((err) => {
    options.onError?.(err);
  });

  processes.push(child);
}

interface CommandOptions {
  command: string;
  stdout?: (data: string) => void;
  onError?: (err: unknown) => void;
}

export interface CommandsOptions {
  onSuccess?: CommandOptions;
  onError?: CommandOptions;
  onBuildStart?: (startTime: number) => void;
  onBuildEnd?: (buildTime: number) => void;
  onBuildWarnings?: (warnings: string[]) => void;
  onBuildErrors?: (errors: string[]) => void;
}

export function esbuildCliPlugin(options: CommandsOptions) {
  let startTime = 0;
  const processes: ExecaChildProcess[] = [];

  let cleanup = () => {};

  const plugin: Plugin = {
    name: 'esbuild-plugin-baeta-cli',
    setup(build) {
      cleanup = () => {
        if (build.initialOptions.watch) {
          return killProcesses(processes);
        }
      };

      build.onStart(() => {
        startTime = performance.now();
        options?.onBuildStart?.(startTime);
      });

      build.onEnd(async (result) => {
        const buildTime = performance.now() - startTime;
        options.onBuildEnd?.(buildTime);

        await killProcesses(processes);

        if (result.warnings.length > 0) {
          const messages = await formatMessages(result.warnings, {
            kind: 'warning',
            color: true,
          });
          options.onBuildWarnings?.(messages);
        }

        if (result.errors.length > 0) {
          const messages = await formatMessages(result.errors, {
            kind: 'error',
            color: true,
          });
          options.onBuildErrors?.(messages);

          return handleCommand(processes, options.onError);
        }

        return handleCommand(processes, options.onSuccess);
      });
    },
  };

  return { plugin, cleanup };
}

export function addCliPlugin(plugins: Plugin[], hooks: Hooks, options?: CommandsOptions) {
  if (!options) {
    return;
  }

  const { plugin, cleanup } = esbuildCliPlugin(options);
  plugins.push(plugin);
  hooks.onStop.push(cleanup);
}
