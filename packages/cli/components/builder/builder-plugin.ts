import { ExecaChildProcess, execaCommand } from 'execa';
import { Writable } from 'node:stream';
import kill from 'tree-kill';

export async function killProcesses(processes: ExecaChildProcess[]) {
  await Promise.all(processes.map((process) => killProcess(process)));
  processes.splice(0, processes.length);
}

export async function startProcess(
  processes: ExecaChildProcess[],
  command: string,
  stdout: (data: string) => void,
  onError: (err: unknown) => void
) {
  const child = execaCommand(command, {
    stdout: 'pipe',
    stderr: 'pipe',
    stripFinalNewline: true,
  });

  const stream = createStream(stdout);
  child.stdout?.pipe(stream);
  child.stderr?.pipe(stream);

  child.catch((err) => {
    onError?.(err);
  });

  processes.push(child);
}

async function killProcess(process: ExecaChildProcess) {
  return new Promise<void>((resolve) => {
    if (process.pid == null) {
      return resolve();
    }
    kill(process.pid, 'SIGKILL', () => resolve());
  });
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
